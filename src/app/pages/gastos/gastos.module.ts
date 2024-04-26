import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GastosPageRoutingModule } from './gastos-routing.module';

import { GastosPage } from './gastos.page';

import { FormatoMilesPipe } from 'src/app/pipes/formato-miles.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GastosPageRoutingModule
  ],
  declarations: [
    GastosPage,
    FormatoMilesPipe]
})
export class GastosPageModule {}
