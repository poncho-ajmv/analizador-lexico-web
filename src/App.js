// src/App.js
import React from 'react';
import Main from './Main';

function App() {
  return (
    <div
      className="App"
      style={{
        backgroundColor: "#0d1117",
        color: "#fff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>
        Analizador Léxico Generalizado
      </h1>
      <p style={{ marginBottom: "30px", fontSize: "1.1rem", color: "#ccc" }}>
        Carga y analiza archivos de texto o JSON para detectar tokens, errores y generar reportes.
      </p>
      <Main />
    </div>
  );
}

export default App;
