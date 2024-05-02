import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

import { NgApexchartsModule } from "ng-apexcharts";
import { FormatoMilesPipeHome } from '../pipes/formato-milesHome.pipe';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    NgApexchartsModule
  ],
  declarations: [HomePage, 
    FormatoMilesPipeHome 
  ]
})
export class HomePageModule {}
