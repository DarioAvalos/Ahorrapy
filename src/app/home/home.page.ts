import { Component, ViewChild } from '@angular/core';
import { AutenticacionService } from '../autenticacion.service';
import { Router } from '@angular/router';

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
export class HomePage {

  @ViewChild("chart") chart: ChartComponent;
  public chartGastos: Partial<ChartOptions>;
  public chartPresup: Partial<ChartOptions>;

  selectTabs = 'cuentas';

  constructor(public router: Router,
              public authService: AutenticacionService
  ) {
    this.chartGastos = {
      series: [100, 55, 13, 43, 22],
      chart: {
        // width: 300,
        // height: 800,
        type: "pie",
        foreColor: '#ffffff',
      },
      labels: ["Comida y bebidas", "Deportes", "Alquiler", "Combustible", "Salud"],
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

    this.chartPresup = {
      series2: [
        {
          name: "basic",
          data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: [
          "South Korea",
          "Canada",
          "United Kingdom",
          "Netherlands",
          "Italy",
          "France",
          "Japan",
          "United States",
          "China",
          "Germany"
        ]
      }
    };
  }


  async logout(){
    this.authService.signOut().then(()=>{
      this.router.navigate(['/landing'])
    }).catch((error)=>{
      console.log(error);
    })
  }

}
