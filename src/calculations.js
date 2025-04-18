export class OperationProcessor {
    constructor(operations) {
      this.operations = operations;
    }
  
    conteo() {
      return this.operations.length;
    }
  
    promedio(operationType) {
      const valores = this._extraerValores(operationType);
      if (valores.length === 0) return 0;
  
      const sumaTotal = valores.reduce((acc, val) => acc + val, 0);
      return sumaTotal / valores.length;
    }
  
    max(operationType) {
      const valores = this._extraerValores(operationType);
      return valores.length ? Math.max(...valores) : null;
    }
  
    min(operationType) {
      const valores = this._extraerValores(operationType);
      return valores.length ? Math.min(...valores) : null;
    }
  
    // 🔧 Utilidad privada para evitar repetir lógica
    _extraerValores(tipoOperacion) {
      const valores = [];
  
      const recolectarValores = (val) => {
        if (Array.isArray(val)) {
          val.forEach(sub => recolectarValores(sub.valor1 ?? 0));
        } else if (typeof val === "number") {
          valores.push(val);
        }
      };
  
      for (const op of this.operations) {
        if (op.operacion === tipoOperacion) {
          recolectarValores(op.valor1);
          recolectarValores(op.valor2);
        }
      }
  
      return valores;
    }
  }
  