import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  registros: any[] = [];

  constructor() { 
    const storedData = localStorage.getItem('registros');
    if (storedData) {
      this.registros = JSON.parse(storedData);
    }
  }

  restarMonto(monto: number, fecha: string) {
    const montoFormateado = monto.toLocaleString('es-PY');
    this.registros.push({ monto: montoFormateado, fecha: fecha });
    this.actualizarLocalStorage();
  }

  obtenerTotal(cuentaValor: number) {
    let totalRestado = 0;
    for (const registro of this.registros) {
      const montoNumerico = parseFloat(registro.monto.replace(/\./g, '').replace(',', '.'));
      totalRestado += montoNumerico;
    }
    return cuentaValor - totalRestado;
  }

  limpiarRegistros() {
    this.registros = [];
    localStorage.removeItem('registros');
  }

  private actualizarLocalStorage() {
    localStorage.setItem('registros', JSON.stringify(this.registros));
  }

}


