import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/modelos/User';
import { BusinessService } from 'src/app/servicios/business.service';

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers: [UsuarioService, BusinessService]
})
export class SigninComponent implements OnInit {

  @Output() iniciaUsuario = new EventEmitter
  public user: User;
  public business: Array<any>;

  constructor(
    private _userService: UsuarioService,
    private _businessService: BusinessService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.user = this._userService.userEmpty();
    this.business = []
  }

  ngOnInit() {
  }

  signin(email,password){
    this._userService.userLogin(email, password).subscribe(
      response => {
        // una vez logeado el usuario lo almacenamos en el localStorage
        this._userService.setIdentity(response);
        // emitimos el evento para cerrar la ventana de diálogo Signin
        this.iniciaUsuario.emit(false);
        // recargamos para que los datos del usuario se almacenen
        location.reload();
      },
      error => {
        console.log(error);
      }
    )
  }

}
