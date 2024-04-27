import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TarjetaPageRoutingModule } from './tarjeta-routing.module';

import { TarjetaPage } from './tarjeta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    TarjetaPageRoutingModule
  ],
  declarations: [TarjetaPage]
})
export class TarjetaPageModule {}
