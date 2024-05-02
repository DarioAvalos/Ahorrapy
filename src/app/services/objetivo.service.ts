import { Injectable } from '@angular/core';
import { Objetivo } from '../models/objetivo.model';

@Injectable({
  providedIn: 'root'
})
export class ObjetivoService {

  private objetivos: Objetivo[] = [];

  constructor() {
    const storedData = localStorage.getItem('objetivos');
    if (storedData) {
      this.objetivos = JSON.parse(storedData);
    }
  }

  agregarObjetivo(objetivo: Objetivo) {
    this.objetivos.push(objetivo);
    this.actualizarLocalStorage();
  }

  eliminarObjetivo(objetivo: Objetivo) {
    this.objetivos = this.objetivos.filter(o => o !== objetivo);
    this.actualizarLocalStorage();
  }

  actualizarProgreso(objetivo: Objetivo) {
    const index = this.objetivos.findIndex(o => o === objetivo);
    if (index !== -1) {
      this.objetivos[index] = objetivo;
      this.actualizarLocalStorage();
    }
  }

  obtenerObjetivos() {
    return this.objetivos;
  }

  private actualizarLocalStorage() {
    localStorage.setItem('objetivos', JSON.stringify(this.objetivos));
  }
}
