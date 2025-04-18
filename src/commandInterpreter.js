// commandInterpreter.js
export class CommandInterpreter {
  constructor(content) {
    this.content = content;
  }

  interpret() {
    const lines = this.content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const trimmedLine = lines[i].trim();
      if (trimmedLine.startsWith("imprimir(") && trimmedLine.endsWith(")")) {
        const match = trimmedLine.match(/imprimir\((".*?"|'.*?')\)/);
        if (match) {
          const text = match[1].slice(1, -1);
          console.log(text);
        } else {
          console.error("Error: Sintaxis inválida en 'imprimir'");
        }
      }
    }
  }
}
