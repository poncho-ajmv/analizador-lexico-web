# 🔍 Analizador Léxico Generalizado (Web)

Aplicación web construida con React que permite analizar archivos de texto o JSON mediante un motor léxico personalizado. Detecta tokens, errores léxicos, comandos e instrucciones, y permite generar reportes o árboles de derivación visualizables.

---

## 🚀 Instalación local

```bash
git clone https://github.com/tu_usuario/analizador-lexico-web.git
cd analizador-lexico-web
npm install
npm start
```

---

## 🧰 Tecnologías utilizadas

- React (Vite o CRA)
- JavaScript moderno (ES6+)
- HTML5 / CSS3 (custom + inline)
- Blob API para generación de archivos
- Graphviz (.dot) para árbol de derivación

---

## ✨ Características principales

- Carga de archivos `.txt`, `.json` o personalizados
- Análisis léxico de operaciones matemáticas y tokens
- Extracción de comentarios simples y múltiples
- Identificación de errores léxicos
- Generación de reportes en HTML
- Exportación de árbol sintáctico en `.dot`
- Consola integrada en tiempo real
- Archivo de ejemplo precargado al iniciar

---

## 📂 Estructura del proyecto

```bash
src/
├── App.js
├── Main.js
├── parseOperations.js
├── calculations.js
├── commandInterpreter.js
├── commentExtractor.js
├── dotGenerator.js
├── errorReportGenerator.js
├── evaluateOperations.js
├── reportGenerator.js
└── index.js
```

---

## 🧪 Ejemplo precargado (al iniciar)

```json
{
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
    "imprimir(\"Este es un ejemplo\")",
    "generarReporte(\"tokens\")",
    "generarReporte(\"errores\", \"mi_reporte\")"
  ]
}
```

---

## 🧾 Licencia

Este proyecto se distribuye bajo la licencia MIT.
