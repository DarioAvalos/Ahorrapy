import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrosPageRoutingModule } from './registros-routing.module';

import { RegistrosPage } from './registros.page';

import { NumericInputDirective } from './numeric-input.directive'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RegistrosPageRoutingModule
  ],
  declarations: [RegistrosPage, NumericInputDirective]
})
export class RegistrosPageModule {}
