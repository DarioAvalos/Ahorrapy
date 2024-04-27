import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  registros: { [cuenta: string]: any[] } = {
    efectivo: [],
    tarjeta: []
  };

  constructor() { 
    const storedData = localStorage.getItem('registros');
    if (storedData) {
      this.registros = JSON.parse(storedData);
    }
  }

  restarMonto(monto: number, fecha: string, cuenta: string, categoria: string) {
    const montoFormateado = monto.toLocaleString('es-PY');
    this.registros[cuenta].push({ monto: montoFormateado, fecha, categoria });
    this.actualizarLocalStorage();
  }

  obtenerTotal(cuentaValor: number, cuenta: string) {
    let totalRestado = 0;
    for (const registro of this.registros[cuenta]) {
      const montoNumerico = parseFloat(registro.monto.replace(/\./g, '').replace(',', '.'));
      totalRestado += montoNumerico;
    }
    return cuentaValor - totalRestado;
  }

  limpiarRegistrosPorCuenta(cuenta: string) {
    this.registros[cuenta] = [];
    this.actualizarLocalStorage();
  }

  obtenerRegistrosPorCuenta(cuenta: string) {
    return this.registros[cuenta];
  }

  // Método para obtener todos los registros
  obtenerRegistros() {
    return this.registros;
  }

  private actualizarLocalStorage() {
    localStorage.setItem('registros', JSON.stringify(this.registros));
  }

}


