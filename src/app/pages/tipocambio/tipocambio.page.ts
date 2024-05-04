import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-tipocambio',
  templateUrl: './tipocambio.page.html',
  styleUrls: ['./tipocambio.page.scss'],
})
export class TipocambioPage {
  baseCurrency: string = 'USD';
  targetCurrency: string = 'PYG';
  accessKey: string = 'beb480265b3d1d7c1a0c63e4153f9fee';

  resultado: number | null = null;

  constructor(private http: HttpClient) {
    const lastResult = localStorage.getItem('lastResult');
    if (lastResult) {
      this.resultado = parseFloat(lastResult);
    }
  }

  async convertir() {
    try {
      const response: any = await this.http.get(`http://api.currencylayer.com/live?access_key=${this.accessKey}&currencies=${this.targetCurrency}&source=${this.baseCurrency}&format=1`).toPromise();
      if (response.success) {
        this.resultado = response.quotes[`${this.baseCurrency}${this.targetCurrency}`];
        localStorage.setItem('lastResult', this.resultado.toString());
      } else {
        console.error('Error en la respuesta de la API:', response.error.info);
      }
    } catch (error) {
      console.error('Error al obtener la tasa de cambio', error);
    }
  }
}





