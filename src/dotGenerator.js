export class DotGenerator {
  constructor(content) {
    this.content = content;
  }

  generate() {
    const lines = this.content.split("\n");
    let dot = "digraph G {\n  node [shape=box];\n";

    lines.forEach((line, index) => {
      const cleanLine = line.trim();
      if (cleanLine) {// eslint-disable-next-line
        dot += `  node${index} [label=\"${cleanLine.replace(/"/g, '\\"')}\"];\n`;
        if (index > 0) {
          dot += `  node${index - 1} -> node${index};\n`;
        }
      }
    });

    dot += "}\n";
    return dot;
  }

  static save(dotContent, fileName = "arbol_derivacion.dot") {
    const blob = new Blob([dotContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  }
}
