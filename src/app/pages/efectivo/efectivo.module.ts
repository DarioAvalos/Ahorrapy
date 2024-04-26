import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EfectivoPageRoutingModule } from './efectivo-routing.module';

import { EfectivoPage } from './efectivo.page';

import { NumericInputDirective } from './numeric-input.directive'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EfectivoPageRoutingModule
  ],
  declarations: [EfectivoPage, NumericInputDirective]
})
export class EfectivoPageModule {}
