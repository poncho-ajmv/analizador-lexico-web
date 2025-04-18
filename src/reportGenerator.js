// reportGenerator.js

class ReportGenerator {
  constructor(fileContent, determinarTipo) {
    this.fileContent = fileContent;
    this.determinarTipo = determinarTipo;
    this.reportes = [];
  }

  // Método para generar el HTML de los reportes
  generarHTMLReportes() {
    let html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reporte Léxico</title>
          <style>
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
          </style>
      </head>
      <body>
          <h1>Reporte Léxico</h1>
          <table>
              <thead>
                  <tr>
                      <th>Tipo</th>
                      <th>Lexema</th>
                      <th>Fila</th>
                      <th>Columna</th>
                  </tr>
              </thead>
              <tbody>
    `;

    this.reportes.forEach((reporte) => {
      html += `
        <tr>
          <td>${reporte.tipo}</td>
          <td>${reporte.lexema}</td>
          <td>${reporte.fila}</td>
          <td>${reporte.columna}</td>
        </tr>
      `;
    });

    html += `
              </tbody>
          </table>
      </body>
      </html>
    `;
    return html;
  }

  // Método para analizar el contenido y generar los reportes
  analizarContenido() {
    const lines = this.fileContent.split("\n");

    lines.forEach((line, rowIndex) => {
      line.split("").forEach((char, colIndex) => {
        const tipo = this.determinarTipo(char);
        if (tipo) {
          this.reportes.push({
            tipo,
            lexema: char,
            fila: rowIndex + 1,
            columna: colIndex + 1,
          });
        }
      });
    });
  }

  // Método principal para generar el reporte
  generarReporte() {
    this.analizarContenido();
    const htmlContent = this.generarHTMLReportes();
    const blob = new Blob([htmlContent], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "reporte_lexico.html";
    link.click();

    console.log("Reporte léxico generado exitosamente.");
  }
}

export default ReportGenerator;
