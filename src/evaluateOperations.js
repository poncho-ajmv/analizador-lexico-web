export const evaluateOperations = (operations) => {
    const evaluate = (operation) => {
      if (!operation || typeof operation !== "object" || !operation.operacion) {
        return null;
      }
  
      const { operacion, valor1, valor2 } = operation;
  
      // Evaluar valor2 si es una lista de operaciones
      let evaluatedValue2;
      if (Array.isArray(valor2)) {
        evaluatedValue2 = valor2.reduce((_, op) => evaluate(op), null);
      } else {
        evaluatedValue2 = valor2;
      }
  
      const aRadianes = (grados) => (grados * Math.PI) / 180;
  
      try {
        switch (operacion) {
          case "suma":
            return valor1 + evaluatedValue2;
          case "resta":
            return valor1 - evaluatedValue2;
          case "multiplicacion":
            return valor1 * evaluatedValue2;
          case "division":
            return valor1 / evaluatedValue2;
          case "raiz":
            return Math.pow(valor1, 1 / evaluatedValue2);
          case "potencia":
            return valor1 ** evaluatedValue2;
          case "inverso":
            return 1 / valor1;
          case "seno":
            return Math.sin(aRadianes(valor1));
          case "coseno":
            return Math.cos(aRadianes(valor1));
          case "tangente":
            return Math.tan(aRadianes(valor1));
          case "mod":
            return valor1 % evaluatedValue2;
          default:
            return null;
        }
      } catch (error) {
        return null;
      }
    };
  
    for (let i = 0; i < operations.length; i++) {
      const op = operations[i];
      const result = evaluate(op);
      console.log(`Resultado de ${op.nombre || "operación anónima"}: ${result}`);
    }
  };

  