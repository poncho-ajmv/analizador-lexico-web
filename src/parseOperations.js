// parseOperations.js

class OperationParser {
    constructor(content) {
      this.content = content;
    }
  
    parse() {
      try {
        const data = JSON.parse(this.content);
        if (Array.isArray(data)) return data;
        if (data.Operaciones) return data.Operaciones;
        return [];
      } catch (error) {
        console.error("Error al interpretar el archivo como JSON válido.");
        return [];
      }
    }
  }
  
  export { OperationParser };
  