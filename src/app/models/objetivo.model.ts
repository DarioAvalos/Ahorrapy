export interface Objetivo {
    nuevoMonto: any;
    nombre: string;
    valor: number;
    progreso?: number;
    totalGasto?: number;
    monto?: string;
    mostrarAlerta?: boolean;
    objetivoAlcanzado?: boolean;
  }