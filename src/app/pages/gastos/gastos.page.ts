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

  selectTabsgasto = 'cuentaE';

  constructor( private registroService: RegistroService ) { }

  ngOnInit() {
    this.cargarRegistros();
  }

  cargarRegistros() {
    const cuenta = this.selectTabsgasto === 'cuentaE' ? 'efectivo' : 'tarjeta';
    const montoInicial = parseFloat(localStorage.getItem(cuenta).replace(/\./g, '').replace(',', '.'));
    this.totalRestado = this.registroService.obtenerTotal(montoInicial, cuenta);
    this.registros = this.registroService.obtenerRegistrosPorCuenta(cuenta);
  }

  segmentChanged(event) {
    this.selectTabsgasto = event.detail.value;
    this.cargarRegistros();
  }

  limpiarRegistros() {
    const cuenta = this.selectTabsgasto === 'cuentaE' ? 'efectivo' : 'tarjeta';
    this.registroService.limpiarRegistrosPorCuenta(cuenta);
    this.cargarRegistros();
  }
}
