import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListcomprasPage } from './listcompras.page';

const routes: Routes = [
  {
    path: '',
    component: ListcomprasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListcomprasPageRoutingModule {}
