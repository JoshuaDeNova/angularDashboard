import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { BusinessService } from 'src/app/servicios/business.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [UsuarioService, BusinessService]
})
export class DashboardComponent implements OnInit {

  public modalRegistro;
  public usuario;
  public business;

  constructor(
    private _modalService: NgbModal,
    private _businessService: BusinessService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UsuarioService
  ) {
    this.usuario = this._userService.getIdentity();
  }

  ngOnInit() {
  }

  // función que abre el modal para registrar al usuario desde el botón
  openRegister(modal) {
    this.modalRegistro = this._modalService.open(modal, { size: 'xl' as 'lg' });
  }

  // función para cerrar el modal de registro
  cierraModal() {
    this.modalRegistro.close();
  }

  comenzarNegocio() {
    this._businessService.getBusiness(this._userService.getIdentity().userId).subscribe(
      response => {
        this.business = response;
        if (this.business.length > 0) {
          this._router.navigate(['negocios']);
        } else {
          this._router.navigate(['negocios/0/editar']);
        }
      },
      error => {
        console.log(error);
      }
    )
  }

}
