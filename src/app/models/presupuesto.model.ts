export interface Presupuesto {
    nombre: string;
    valor: number;
    categoria: string[];
    porcentaje?: number;
    totalGasto?: number;
    saldo?: number;
  }