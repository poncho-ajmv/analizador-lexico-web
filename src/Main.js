import React, { useState, useEffect } from "react";
import { CommentExtractor } from "./commentExtractor";
import { CommandInterpreter } from "./commandInterpreter";
import { OperationParser } from "./parseOperations";
import { evaluateOperations } from "./evaluateOperations";
import { OperationProcessor } from "./calculations";
import ReportGenerator from "./reportGenerator";
import { DotGenerator } from "./dotGenerator";
import { generateErrorReport } from "./errorReportGenerator";

// Manejo de archivos
class FileHandler {
  static openFile(event, setFileContent, setFileName) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setFileContent(e.target.result);
      reader.readAsText(file);
      setFileName(file.name);
    }
  }

  static saveFile(content, name) {
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = name;
    link.click();
  }

  static saveFileAs(content, name, setFileName) {
    const newName = prompt("Enter a new file name:", name);
    if (newName) {
      FileHandler.saveFile(content, newName);
      setFileName(newName);
    }
  }

  static downloadExample() {
    const example = `{
  "Operaciones": [
    {
      "nombre": "SumaEjemplo",
      "operacion": "suma",
      "valor1": 5,
      "valor2": 10
    },
    {
      "nombre": "MultiplicacionEjemplo",
      "operacion": "multiplicacion",
      "valor1": 3,
      "valor2": 4
    }
  ]
}`;
    FileHandler.saveFile(example, "ejemplo_operaciones.json");
  }
}

// Consola integrada
class ConsoleHandler {
  static overrideConsole(setLogs) {
    const originalLog = console.log;
    const originalError = console.error;

    console.log = (...args) => {
      originalLog(...args);
      setLogs((logs) => [...logs, { type: "log", message: args.join(" ") }]);
    };

    console.error = (...args) => {
      originalError(...args);
      setLogs((logs) => [...logs, { type: "error", message: args.join(" ") }]);
    };

    return () => {
      console.log = originalLog;
      console.error = originalError;
    };
  }

  static clear(setLogs) {
    setLogs([]);
  }
}

// Analizador principal
class Analyzer {
  constructor(content, determinarTipo) {
    this.content = content;
    this.determinarTipo = determinarTipo;
  }

  analyzeComments() {
    const comments = new CommentExtractor(this.content).extract();
    comments.forEach((c) =>
      console.log(
        `${c.type === "single" ? "Comentario simple" : "Comentario múltiple"}: ${c.text}`
      )
    );
  }

  analyzeErrors() {
    const errors = [];
    const lines = this.content.split("\n");
    lines.forEach((line, row) =>
      [...line].forEach((char, col) => {
        const tipo = this.determinarTipo(char);
        if (tipo === "Error léxico") {
          errors.push({ token: char, type: tipo, row: row + 1, column: col + 1 });
        }
      })
    );
    return errors;
  }

  analyze() {
    this.analyzeComments();

    const parser = new OperationParser(this.content);
    const operations = parser.parse();
    const processor = new OperationProcessor(operations);

    console.log(`Total de operaciones: ${processor.conteo()}`);
    console.log(`Promedio de 'suma': ${processor.promedio("suma")}`);
    console.log(`Máximo de 'multiplicación': ${processor.max("multiplicacion")}`);
    console.log(`Mínimo de 'raíz': ${processor.min("raiz")}`);

    evaluateOperations(operations);
    new CommandInterpreter(this.content).interpret();

    if (this.content.includes(`generarReporte("tokens")`)) {
      new ReportGenerator(this.content, this.determinarTipo).generarReporte();
    }

    if (this.content.includes(`generarReporte("errores"`)) {
      const match = this.content.match(/generarReporte\("errores",\s*"(.*?)"\)/);
      const reportName = match ? match[1] : "errores_reporte";
      const errors = this.analyzeErrors();
      if (errors.length > 0) {
        console.log(`Errores encontrados: ${errors.length}`);
        generateErrorReport(errors, reportName);
      } else {
        console.log("No se encontraron errores.");
      }
    }
  }
}

function FileEditor() {
  const [fileContent, setFileContent] = useState(`{
    "Operaciones": [
      {
        "nombre": "SumaEjemplo",
        "operacion": "suma",
        "valor1": 5,
        "valor2": 10
      },
      {
        "nombre": "MultiplicacionEjemplo",
        "operacion": "multiplicacion",
        "valor1": 3,
        "valor2": 4
      }
    ],
    "Comandos": [
      "imprimir(\\\"Este es un ejemplo\\\")",
      "generarReporte(\\\"tokens\\\")",
      "generarReporte(\\\"errores\\\", \\\"mi_reporte\\\")"
    ]
  }`);
  
  const [fileName, setFileName] = useState("untitled.txt");
  const [consoleLogs, setConsoleLogs] = useState([]);

  useEffect(() => ConsoleHandler.overrideConsole(setConsoleLogs), []);

  const determinarTipo = (char) => {
    if (/[a-zA-Z]/.test(char)) return "Identificador";
    if (/\d/.test(char)) return "Número";
    if (/[{}[\]()]/.test(char)) {
      return { "(": "Paréntesis apertura", ")": "Paréntesis cierre", "{": "Llave apertura", "}": "Llave cierre" }[char];
    }
    if (/"/.test(char)) return "Comilla";
    if (/,/.test(char)) return "Coma";
    if (/[-+*/^]/.test(char)) return "Operador";
    if (/\s/.test(char)) return null;
    return "Error léxico";
  };

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px", fontFamily: "Segoe UI" }}>
      <div style={{ flex: 1, padding: "20px", backgroundColor: "#000", color: "#fff", borderRadius: "8px" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>Editor de Entrada</h2>
        <p style={{ fontSize: "0.9rem", color: "#aaa", marginBottom: "20px" }}>
          Carga archivos .txt, .json u otros para analizarlos léxicamente.
        </p>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "15px" }}>
          <button style={buttonStyle} onClick={() => document.getElementById("fileInput").click()}>Open File</button>
          <input id="fileInput" type="file" accept="*" style={{ display: "none" }} onChange={(e) => FileHandler.openFile(e, setFileContent, setFileName)} />
          <button style={buttonStyle} onClick={() => FileHandler.saveFile(fileContent, fileName)}>Save</button>
          <button style={buttonStyle} onClick={() => FileHandler.saveFileAs(fileContent, fileName, setFileName)}>Save As</button>
          <button style={buttonStyle} onClick={() => FileHandler.downloadExample()}>Descargar Ejemplo</button>
          <button style={buttonStyle} onClick={() => new ReportGenerator(fileContent, determinarTipo).generarReporte()}>Generate Report</button>
          <button style={buttonStyle} onClick={() => {
            const errors = new Analyzer(fileContent, determinarTipo).analyzeErrors();
            if (errors.length > 0) {
              console.log(`Errores encontrados: ${errors.length}`);
              generateErrorReport(errors, "errores_detectados");
            } else {
              console.log("No se encontraron errores.");
            }
          }}>Generate Errors</button><button style={buttonStyle} onClick={() => {
            const dotContent = new DotGenerator(fileContent).generate();
            DotGenerator.save(dotContent);
          }}>Generar Árbol (.dot)</button>
          <button style={buttonStyle} onClick={() => ConsoleHandler.clear(setConsoleLogs)}>Clear Console</button>
          <button style={buttonStyle} onClick={() => new Analyzer(fileContent, determinarTipo).analyze()}>Analyze</button>
          
        </div>
        <textarea value={fileContent} onChange={(e) => setFileContent(e.target.value)} style={textareaStyle} />
      </div>

      <div style={consoleStyle}>
        <h2 style={{ fontSize: "1.5rem", color: "#fff", marginBottom: "10px" }}>Consola</h2>
        <div>
          {consoleLogs.map((log, idx) => (
            <div key={idx} style={{ padding: "10px", marginBottom: "6px", borderRadius: "4px", backgroundColor: log.type === "error" ? "#a94442" : "#155724", color: "#fff" }}>
              {log.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const buttonStyle = {
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  padding: "10px 16px",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "0.9rem"
};

const textareaStyle = {
  width: "100%",
  height: "300px",
  fontFamily: "monospace",
  padding: "10px",
  border: "1px solid #444",
  borderRadius: "4px",
  backgroundColor: "#222",
  color: "#fff",
  resize: "vertical"
};

const consoleStyle = {
  flex: 1,
  padding: "20px",
  backgroundColor: "#1a1a1a",
  borderRadius: "8px",
  overflowY: "auto",
  height: "400px"
};

export default FileEditor;
