import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registrar',
    loadChildren: () => import('./pages/registrar/registrar.module').then( m => m.RegistrarPageModule)
  },
  {
    path: 'landing',
    loadChildren: () => import('./pages/landing/landing.module').then( m => m.LandingPageModule)
  },
  {
    path: 'resetpassword',
    loadChildren: () => import('./pages/resetpassword/resetpassword.module').then( m => m.ResetpasswordPageModule)
  },
  {
    path: 'categorias',
    loadChildren: () => import('./pages/categorias/categorias.module').then( m => m.CategoriasPageModule)
  },
  {
    path: 'registros',
    loadChildren: () => import('./pages/nuevo-registros/registros.module').then( m => m.RegistrosPageModule)
  },
  {
    path: 'gastos',
    loadChildren: () => import('./pages/gastos/gastos.module').then( m => m.GastosPageModule)
  },
  {
    path: 'editcategorias',
    loadChildren: () => import('./pages/editcategorias/editcategorias.module').then( m => m.EditcategoriasPageModule)
  },
  {
    path: 'cuentas',
    loadChildren: () => import('./pages/cuentas/cuentas.module').then( m => m.CuentasPageModule)
  },
  {
    path: 'efectivo',
    loadChildren: () => import('./pages/efectivo/efectivo.module').then( m => m.EfectivoPageModule)
  },
  {
    path: 'tarjeta',
    loadChildren: () => import('./pages/tarjeta/tarjeta.module').then( m => m.TarjetaPageModule)
  },
  {
    path: 'presupuesto',
    loadChildren: () => import('./pages/presupuesto/presupuesto.module').then( m => m.PresupuestoPageModule)
  },
  {
    path: 'objetivos',
    loadChildren: () => import('./pages/objetivos/objetivos.module').then( m => m.ObjetivosPageModule)
  },
  {
    path: 'listcompras',
    loadChildren: () => import('./pages/listcompras/listcompras.module').then( m => m.ListcomprasPageModule)
  },
  {
    path: 'tipocambio',
    loadChildren: () => import('./pages/tipocambio/tipocambio.module').then( m => m.TipocambioPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'acerca',
    loadChildren: () => import('./pages/acerca/acerca.module').then( m => m.AcercaPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
