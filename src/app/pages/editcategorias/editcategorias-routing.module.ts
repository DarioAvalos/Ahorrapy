import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditcategoriasPage } from './editcategorias.page';

const routes: Routes = [
  {
    path: '',
    component: EditcategoriasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditcategoriasPageRoutingModule {}
