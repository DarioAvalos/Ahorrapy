import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-tipocambio',
  templateUrl: './tipocambio.page.html',
  styleUrls: ['./tipocambio.page.scss'],
})
export class TipocambioPage {
  baseCurrency: string = 'USD';
  targetCurrency: string = 'PYG';
  accessKey: string = 'beb480265b3d1d7c1a0c63e4153f9fee'; // Reemplaza 'TU_ACCESS_KEY' por tu clave de acceso

  resultado: number | null = null;

  constructor() {
    const lastResult = localStorage.getItem('lastResult');
    if (lastResult) {
      this.resultado = parseFloat(lastResult);
    }
  }

  async convertir() {
    try {
      const response = await axios.get(`http://apilayer.net/api/live?access_key=${this.accessKey}&currencies=${this.targetCurrency}&source=${this.baseCurrency}&format=1`);
      this.resultado = response.data.quotes[`${this.baseCurrency}${this.targetCurrency}`];
      localStorage.setItem('lastResult', this.resultado.toString());
    } catch (error) {
      console.error('Error al obtener la tasa de cambio', error);
    }
  }
}





