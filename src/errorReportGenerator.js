//errorReportGenerator.js

export const generateErrorReport = (errors, reportName) => {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${reportName} - Errores</title>
        <style>
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid black; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <h1>Reporte de Errores</h1>
        <table>
          <thead>
            <tr>
              <th>Carácter/Token</th>
              <th>Tipo</th>
              <th>Fila</th>
              <th>Columna</th>
            </tr>
          </thead>
          <tbody>
            ${errors.map(error => `
              <tr>
                <td>${error.token}</td>
                <td>${error.type}</td>
                <td>${error.row}</td>
                <td>${error.column}</td>
              </tr>`).join("")}
          </tbody>
        </table>
      </body>
      </html>
    `;
  
    const blob = new Blob([htmlContent], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${reportName}.html`;
    link.click();
  };
  