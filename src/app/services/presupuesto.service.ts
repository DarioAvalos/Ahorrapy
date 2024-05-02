import { Injectable } from '@angular/core';
import { Presupuesto } from '../models/presupuesto.model';

@Injectable({
  providedIn: 'root'
})
export class PresupuestoService {

  private presupuestos: Presupuesto[] = [];

  constructor() {
    const storedData = localStorage.getItem('presupuestos');
    if (storedData) {
      this.presupuestos = JSON.parse(storedData);
    }
  }

  agregarPresupuesto(presupuesto: Presupuesto) {
    this.presupuestos.push(presupuesto);
    this.actualizarLocalStorage();
  }

  eliminarPresupuesto(presupuesto: Presupuesto) {
    this.presupuestos = this.presupuestos.filter(p => p !== presupuesto);
    this.actualizarLocalStorage();
  }

  obtenerPresupuestos() {
    return this.presupuestos;
  }

  private actualizarLocalStorage() {
    localStorage.setItem('presupuestos', JSON.stringify(this.presupuestos));
  }
}

