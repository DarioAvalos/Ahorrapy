import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  registros: { [cuenta: string]: any[] } = {
    efectivo: [],
    tarjeta: []
  };

  registrosCambiados = new Subject<void>();
  selectTabsChanged = new Subject<string>();

  constructor() { 
    const storedData = localStorage.getItem('registros');
    if (storedData) {
      this.registros = JSON.parse(storedData);
    }
  }

  restarMonto(monto: number, fecha: string, cuenta: string, categoria: string) {
    const montoFormateado = monto.toLocaleString('es-PY');
    this.registros[cuenta].push({ monto: montoFormateado, fecha, categoria });
    this.registrosCambiados.next();
    // Emitir el cambio de selectTabs
    this.selectTabsChanged.next(cuenta);
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

  obtenerTotalResta(cuenta: string) {
    let totalRestado = 0;
    for (const registro of this.registros[cuenta]) {
      const montoNumerico = parseFloat(registro.monto.replace(/\./g, '').replace(',', '.'));
      totalRestado += montoNumerico;
    }
    return totalRestado;
  }


  limpiarRegistrosPorCuenta(cuenta: string) {
    this.registros[cuenta] = [];
    this.actualizarLocalStorage();
    this.registrosCambiados.next();
  }

  obtenerRegistrosPorCuenta(cuenta: string) {
    return this.registros[cuenta];
  }

  // Método para obtener las categorías y montos de gastos
  obtenerGastosGrafico(cuenta:string) {
    const gastosgrafico = {};
    for (const registro of this.registros[cuenta]) {
      if (!gastosgrafico[registro.categoria]) {
        gastosgrafico[registro.categoria] = 0;
      }
      gastosgrafico[registro.categoria] += parseFloat(registro.monto.replace(/\./g, '').replace(',', '.'));
    }
    return gastosgrafico;
  }

  obtenerTotalGastoPorCategoria(categorias: string[]) {
    let totalGasto = 0;
    categorias.forEach(categoria => {
      totalGasto += this.registros['efectivo']
        .concat(this.registros['tarjeta'])
        .filter(registro => registro.categoria === categoria)
        .reduce((total, registro) => total + parseFloat(registro.monto.replace(/\./g, '').replace(',', '.')), 0);
    });
    return totalGasto;
  }

  obtenerRegistros() {
    return this.registros;
  }

  private actualizarLocalStorage() {
    localStorage.setItem('registros', JSON.stringify(this.registros));
  }

}


