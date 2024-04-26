import { Component, OnInit } from '@angular/core';
import { RegistroService } from 'src/app/services/registros.service';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.page.html',
  styleUrls: ['./gastos.page.scss'],
})
export class GastosPage implements OnInit {

  registros: any[];
  totalRestado: number;
  cuenta: string;

  constructor(private registroService: RegistroService) { }

  ngOnInit() {
    this.registros = this.registroService.registros;
    const cuenta = JSON.parse(localStorage.getItem('cuentaE'));
    const montoInicial = parseFloat(cuenta.valor.replace(/\./g, '').replace(',', '.'));
    this.totalRestado = this.registroService.obtenerTotal(montoInicial);
    console.log(montoInicial)
  }

  limpiarRegistros() {
    this.registroService.limpiarRegistros();
  }

}
