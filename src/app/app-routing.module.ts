import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { DocumentacionComponent } from './modules/documentacion/documentacion.component';
import { AdminBusinessComponent } from './modules/admin-business/admin-business.component';
import { DatosUsuarioComponent } from './modules/datos-usuario/datos-usuario.component';
import { EditBusinessComponent } from './modules/edit-business/edit-business.component';
import { AdminLocalesComponent } from './modules/admin-locales/admin-locales.component';
import { EditPremisesComponent } from './modules/edit-premises/edit-premises.component';
import { AdminWorkersComponent } from './modules/admin-workers/admin-workers.component';
import { EditWorkersComponent } from './modules/edit-workers/edit-workers.component';
import { AdminFixedAssetsComponent } from './modules/admin-fixed-assets/admin-fixed-assets.component';
import { EditFixedAssetsComponent } from './modules/edit-fixed-assets/edit-fixed-assets.component';


const routes: Routes = [{
    path: '',
    component: DefaultComponent,
    children: [{
      path: '',
      component: DashboardComponent
    }, {
      path: 'documentacion',
      component: DocumentacionComponent
    }, {
      path: 'negocios',
      component: AdminBusinessComponent
    }, {
      path: 'usuarios',
      component: DatosUsuarioComponent
    },{
      path: 'negocios/:id/editar',
      component: EditBusinessComponent
    }, {
      path: 'locales',
      component: AdminLocalesComponent
    },
    {
      path: 'locales/:id/editar',
      component: EditPremisesComponent
    },
    {
      path: 'trabajadores',
      component: AdminWorkersComponent
    },
    {
      path: 'trabajadores/:id/editar',
      component: EditWorkersComponent
    },
    {
      path: 'inmovilizados',
      component: AdminFixedAssetsComponent
    },
    {
      path: 'inmovilizados/:id/editar',
      component: EditFixedAssetsComponent
    }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
