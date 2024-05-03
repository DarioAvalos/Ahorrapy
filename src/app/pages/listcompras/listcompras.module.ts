import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListcomprasPageRoutingModule } from './listcompras-routing.module';

import { ListcomprasPage } from './listcompras.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListcomprasPageRoutingModule
  ],
  declarations: [ListcomprasPage]
})
export class ListcomprasPageModule {}
