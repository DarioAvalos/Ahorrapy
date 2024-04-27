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

  selectTabs = 'cuentaE';

  constructor( private registroService: RegistroService ) { }

  ngOnInit() {
    this.cargarRegistros();
  }

  cargarRegistros(){
    this.registros = this.registroService.registros;
    const cuenta = JSON.parse(localStorage.getItem(this.selectTabs));
    const montoInicial = parseFloat(cuenta.valor.replace(/\./g, '').replace(',', '.'));
    this.totalRestado = this.registroService.obtenerTotal(montoInicial);
    // console.log(montoInicial)
  }

  segmentChanged(event) {
    this.selectTabs = event.detail.value;
    this.cargarRegistros();
  }

  limpiarRegistros() {
    this.registroService.limpiarRegistros();
    this.cargarRegistros();
  }

}
