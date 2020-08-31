// LIBRERIAS NECESARIAS PARA LOS DISTINTOS COMPONENTES DE ESTE MODULO

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule, MatDividerModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// COMPONENTES DE ESTE MÓDULO PRINCIPAL DEFAULT (modules = componentes principales)

import { DocumentacionComponent } from 'src/app/modules/documentacion/documentacion.component';
import { AdminBusinessComponent } from 'src/app/modules/admin-business/admin-business.component';
import { AdminLocalesComponent } from 'src/app/modules/admin-locales/admin-locales.component';
import { DatosUsuarioComponent } from 'src/app/modules/datos-usuario/datos-usuario.component';
import { EditBusinessComponent } from 'src/app/modules/edit-business/edit-business.component';
import { EditPremisesComponent } from 'src/app/modules/edit-premises/edit-premises.component';
import { AdminWorkersComponent } from 'src/app/modules/admin-workers/admin-workers.component';
import { EditWorkersComponent } from 'src/app/modules/edit-workers/edit-workers.component';
import { AdminFixedAssetsComponent } from 'src/app/modules/admin-fixed-assets/admin-fixed-assets.component';
import { EditFixedAssetsComponent } from 'src/app/modules/edit-fixed-assets/edit-fixed-assets.component';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    DocumentacionComponent,
    AdminBusinessComponent,
    AdminLocalesComponent,
    AdminWorkersComponent,
    AdminFixedAssetsComponent,
    DatosUsuarioComponent,
    EditBusinessComponent,
    EditPremisesComponent,
    EditWorkersComponent,
    EditFixedAssetsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    BrowserModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDKNn2kDtA3TjEkpIqSddLrfJ6DwBDH1Rk',
      libraries: ['places']
    })
  ]
})
export class DefaultModule { }
