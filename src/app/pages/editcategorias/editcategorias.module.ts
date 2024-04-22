import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditcategoriasPageRoutingModule } from './editcategorias-routing.module';

import { EditcategoriasPage } from './editcategorias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditcategoriasPageRoutingModule
  ],
  declarations: [EditcategoriasPage]
})
export class EditcategoriasPageModule {}
