import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/modelos/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [UsuarioService]
})
export class HeaderComponent implements OnInit {

  @Output() abreSidebarMenu: EventEmitter<any> = new EventEmitter();
  public modalInicioSesion;
  public usuario: User;

  constructor(
    private _usuarioService: UsuarioService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _modalService: NgbModal
  ) { 
    this.usuario = this._usuarioService.getIdentity();
  }

  ngOnInit() {
  }

  // emitimos el evento para que se entere el menú que debe abrirse
  abreSidebar(){
    this.abreSidebarMenu.emit()
  }

  // abrimos el modal para inicios de sesión
  openSignIn(modalSignin){
    this.modalInicioSesion = this._modalService.open(modalSignin, { ariaLabelledBy: 'modal-basic-title' });
  }

  // función para cerrar el modal de inicio Sesión
  cierraModal(){
    this.modalInicioSesion.close();
  }

  // función para cerrar sesión y vacíar el localStorage
  logOut(){
    this._router.navigate(['']);
    this._usuarioService.setIdentity(null);
    setTimeout(() => {
      location.reload();
      }, 10);
  }

}
