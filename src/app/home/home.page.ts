import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AutenticacionService } from '../services/autenticacion.service';
import { Router } from '@angular/router';

import { RegistroService } from '../services/registros.service';

import { Subscription } from 'rxjs';

import { AlertController } from '@ionic/angular';
import { PresupuestoService } from '../services/presupuesto.service';
import { ObjetivoService } from '../services/objetivo.service';
import { Objetivo } from '../models/objetivo.model';
import { Presupuesto } from '../models/presupuesto.model';

import {
  ApexNonAxisChartSeries,
  ApexAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  series2: ApexAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
};

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  @ViewChild("chart") chart: ChartComponent;
  public chartGastos: Partial<ChartOptions>;

  selectTabs = 'cuentas';

  selectTabs2 = 'efectivo';

  totalGastos: number = 0;

  totalRestadoE: number = 0;
  totalRestadoT: number= 0;
  cuenta: string = this.selectTabs2;
  registrosE: any[] = [];
  registrosT: any[] = [];
  presupuestos: Presupuesto[] = [];
  totalGasto: number = 0;

  objetivos: Objetivo[] = [];

  private selectTabsSubscription: Subscription;

  constructor(public router: Router,
              public authService: AutenticacionService,
              private registroService: RegistroService,
              private alertController: AlertController,
              private presupuestoService: PresupuestoService,
              private objectService: ObjetivoService
  ) {
    this.chartGastos = {
      series: [],
      chart: {
        // width: 300,
        // height: 800,
        type: "pie",
        foreColor: '#ffffff',
      },
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              // width: 200,
              // height: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };

    
  }

  ngOnInit() {
    this.cargarRegistrosE();
    this.cargarRegistrosT();
    this.actualizarTotalGastos(this.selectTabs2);
    this.Muestragrafico(this.selectTabs2);


    // Suscribirse al Subject registrosCambiados del servicio para actualizar los registros automáticamente
    this.registroService.registrosCambiados.subscribe(() => {
      this.cargarRegistrosE();
      this.cargarRegistrosT();
      this.actualizarTotalGastos(this.selectTabs2);
      this.Muestragrafico(this.selectTabs2);
    });

    this.selectTabsSubscription = this.registroService.selectTabsChanged.subscribe(
      (selectTabs: string) => {
        this.selectTabs2 = selectTabs;
        this.actualizarTotalGastos(this.selectTabs2);
        this.Muestragrafico(this.selectTabs2);
        this.cargarRegistrosE();
        this.cargarRegistrosT();
      }
    );

    // this.presupuestos = this.presupuestoService.obtenerPresupuestos();
  }

  ionViewWillEnter() {
    // Recargar datos cada vez que la página se visualiza
    this.cargarRegistrosE();
    this.cargarRegistrosT();
    this.actualizarTotalGastos(this.selectTabs2);
    this.Muestragrafico(this.selectTabs2);

    // Mostrar alert si ambos totalRestadoE y totalRestadoT son 0
    if (this.totalRestadoE === 0 && this.totalRestadoT === 0) {
      this.presentAlert();
    }

    this.presupuestos = this.presupuestoService.obtenerPresupuestos();
    this.calcularTotalGasto();
    
    this.objetivos = this.objectService.obtenerObjetivos();
  }

  
  calcularTotalGasto() {
    this.totalGasto = 0;
    this.presupuestos.forEach(presupuesto => {
      const monto = parseFloat(presupuesto.valor.toString().replace(/\./g, '').replace(',', '.'));
      const totalGastoPresupuesto = this.registroService.obtenerTotalGastoPorCategoria(presupuesto.categoria);
      presupuesto.porcentaje = (totalGastoPresupuesto / monto) * 1;
      presupuesto.saldo = monto - totalGastoPresupuesto;
      presupuesto.totalGasto = totalGastoPresupuesto;
      this.totalGasto += totalGastoPresupuesto;
      // console.log(monto,totalGastoPresupuesto)
    });
  }

  async cargarRegistrosE() {
    const cuenta = 'cuentaE' ;
    const montoInicial = JSON.parse(localStorage.getItem(cuenta) || '{}');
    const valores = montoInicial.valor;

    // Eliminar los puntos y convertir a número
    const valorNumerico = Number(valores.replace(/\./g, '').replace(',', '.'));

    this.totalRestadoE = this.registroService.obtenerTotal(valorNumerico, 'efectivo');
    this.registrosE = this.registroService.obtenerRegistrosPorCuenta('efectivo');
    // console.log(this.registrosE);
    
  }

  async cargarRegistrosT() {
    const cuenta = 'cuentaT' ;
    const montoInicial = JSON.parse(localStorage.getItem(cuenta) || '{}');
    const valores = montoInicial.valor;

    // Eliminar los puntos y convertir a número
    const valorNumerico = Number(valores.replace(/\./g, '').replace(',', '.'));

    this.totalRestadoT = this.registroService.obtenerTotal(valorNumerico, 'tarjeta');
    this.registrosT = this.registroService.obtenerRegistrosPorCuenta('tarjeta');
  }


  actualizarTotalGastos(cuenta:string) {
    this.totalGastos = this.registroService.obtenerTotalResta(cuenta);
  }

  Muestragrafico(cuenta:string) {
  // Obtener las categorías y montos de gastos en efectivo
  const gastosgrafico = this.registroService.obtenerGastosGrafico(cuenta);
  // Convertir el objeto en dos arreglos separados para series y labels
   if (Object.keys(gastosgrafico).length === 0) {
    // Si el objeto está vacío, establecer el gráfico en cero
    this.chartGastos.series = [0];
    this.chartGastos.labels = ["No hay datos"];
  } else {
    // Convertir el objeto en dos arreglos separados para series y labels
    this.chartGastos.series = Object.values(gastosgrafico);
    this.chartGastos.labels = Object.keys(gastosgrafico);
  }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: 'Para comenzar a utilizar la aplicacion vaya a cuentas y elija un tipo de cuenta para cargar su monto',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/cuentas']);
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnDestroy() {
    // Desechar la subscripción al dejar la página
    if (this.selectTabsSubscription) {
      this.selectTabsSubscription.unsubscribe();
    }
  }

  async logout(){
    this.authService.signOut().then(()=>{
      this.router.navigate(['/landing'])
    }).catch((error)=>{
      console.log(error);
    })
  }

}
