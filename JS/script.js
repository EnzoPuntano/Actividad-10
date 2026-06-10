// Se ejecuta al hacer clic en el botón
function descargarReporte() {

  // Conectamos con la librería jsPDF
  const { jsPDF } = window.jspdf;


  // Leemos los campos del formulario

  const nombre  = document.getElementById("inputNombre").value.trim();
  const detalle = document.getElementById("inputDetalle").value.trim();
  const materia = document.getElementById("inputMateria").value.trim();


  // Validación

  if (nombre === "" || detalle === "") {
    alert("⚠️ Por favor completá el nombre y el detalle antes de generar el PDF.");
    return; // Detiene la función aquí
  }


  // Creamos el documento PDF

  const doc = new jsPDF();


  // Diseñamos el contenido del PDF

  // Banda de color de encabezado
  doc.setFillColor(59, 125, 216);          // Color azul (R, G, B)
  doc.rect(0, 0, 210, 28, "F");            // Rectángulo relleno:

  // Título principal (sobre la banda azul)
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);         // Texto blanco
  doc.text("REPORTE TÉCNICO OFICIAL", 20, 18);

  // Subtítulo institucional
  doc.setFontSize(9);
  doc.setFont("Helvetica", "normal");
  doc.text("EEST N°1 - Eduardo Ader · Vicente López", 20, 25);


  // Volvemos al color negro para el cuerpo
  doc.setTextColor(0, 0, 0);


  // Sección: datos del reporte
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(11);
  doc.text("DATOS DEL REGISTRO", 20, 42);

  // Línea divisoria debajo del subtítulo de sección
  doc.setDrawColor(59, 125, 216);          // Color de línea: azul
  doc.setLineWidth(0.5);
  doc.line(20, 44, 190, 44);              // Línea horizontal: (x1, y1, x2, y2)


  // Contenido: campos con etiqueta en negrita y valor en normal
  const yInicio = 55; // Posición vertical de arranque
  const espacioLinea = 10; // Espacio entre cada línea (mm)

  // Operador / Alumno
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Operador / Alumno:", 20, yInicio);
  doc.setFont("Helvetica", "normal");
  doc.text(nombre, 75, yInicio);

  // Detalle del registro
  doc.setFont("Helvetica", "bold");
  doc.text("Detalle del Registro:", 20, yInicio + espacioLinea);
  doc.setFont("Helvetica", "normal");
  // splitTextToSize parte el texto si es muy largo para que no se salga de la página
  const detalleFormateado = doc.splitTextToSize(detalle, 110);
  doc.text(detalleFormateado, 75, yInicio + espacioLinea);

  // Materia / Área (si fue completada)
  if (materia !== "") {
    doc.setFont("Helvetica", "bold");
    doc.text("Materia / Área:", 20, yInicio + espacioLinea * 2);
    doc.setFont("Helvetica", "normal");
    doc.text(materia, 75, yInicio + espacioLinea * 2);
  }

  // Fecha y hora de emisión (se obtienen automáticamente del sistema)
  const fechaActual = new Date().toLocaleDateString("es-AR");   // Ej: 10/6/2026
  const horaActual  = new Date().toLocaleTimeString("es-AR");   // Ej: 19:35:00

  doc.setFont("Helvetica", "bold");
  doc.text("Fecha de Emisión:", 20, yInicio + espacioLinea * 3);
  doc.setFont("Helvetica", "normal");
  doc.text(fechaActual, 75, yInicio + espacioLinea * 3);

  doc.setFont("Helvetica", "bold");
  doc.text("Hora de Registro:", 20, yInicio + espacioLinea * 4);
  doc.setFont("Helvetica", "normal");
  doc.text(horaActual, 75, yInicio + espacioLinea * 4);


  // Caja de estado: "APROBADO"
  doc.setFillColor(232, 245, 233);         // Verde claro de fondo
  doc.setDrawColor(102, 187, 106);         // Verde del borde
  doc.roundedRect(20, 110, 80, 16, 3, 3, "FD"); // (x, y, ancho, alto, radio, radio, "FD"=fill+draw)

  doc.setFont("Helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(46, 125, 50);           // Verde oscuro
  doc.text("Estado: APROBADO", 28, 121);


  // Pie de página
  doc.setTextColor(150, 150, 150);         // Gris suave
  doc.setFont("Helvetica", "italic");
  doc.setFontSize(8);
  doc.text(
    "Documento generado automáticamente · EEST N°1 Vicente López · PWD 7° 2°B 2026",
    20,
    285
  );

  // Línea superior del pie
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.3);
  doc.line(20, 280, 190, 280);


  // Descargamos el PDF de forma automática

  const nombreArchivo = "reporte_" + nombre.replace(/\s+/g, "_") + ".pdf";
  doc.save(nombreArchivo);


  // Mostramos el mensaje de éxito en la página
  const mensaje = document.getElementById("mensajeExito");
  mensaje.style.display = "block";

  // Lo ocultamos automáticamente después de 4 segundos
  setTimeout(function () {
    mensaje.style.display = "none";
  }, 4000);

}