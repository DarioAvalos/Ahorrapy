import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TipocambioPage } from './tipocambio.page';

const routes: Routes = [
  {
    path: '',
    component: TipocambioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipocambioPageRoutingModule {}
