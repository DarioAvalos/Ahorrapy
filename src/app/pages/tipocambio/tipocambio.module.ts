import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TipocambioPageRoutingModule } from './tipocambio-routing.module';

import { TipocambioPage } from './tipocambio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TipocambioPageRoutingModule
  ],
  declarations: [TipocambioPage]
})
export class TipocambioPageModule {}
