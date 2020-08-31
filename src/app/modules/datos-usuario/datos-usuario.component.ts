import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/modelos/User';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'datos-usuario',
  templateUrl: './datos-usuario.component.html',
  styleUrls: ['./datos-usuario.component.css'],
  providers: [UsuarioService]
})
export class DatosUsuarioComponent implements OnInit {

  @Output() accionRealizada = new EventEmitter
  public usuario: User;
  public tittle: String;

  constructor(
    private _userService: UsuarioService,
    private _router: Router
  ) {
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    if (this._userService.getIdentity() == null) {
      this.usuario = this._userService.userEmpty();
      this.tittle = 'Aceptar';
    } else {
      this.usuario = this._userService.getIdentity();
      this.tittle = 'Modificar datos';
    }
  }

  // función submit del formulario para registrar o modificar el usuario
  onSubmit() {
    if(this._userService.getIdentity() == null){
      // si la identity esta null (registraremos al usuario)
      this._userService.userRegister(this.usuario).subscribe(
        response => {
          // emitimos el evento false para que se cierre el cuadro de diálogo
          this.accionRealizada.emit(false);
        }, error => {
          console.log(error);
        }
      )
    } else {
      // si hay datos en el identity (modificaremos sus datos)
      this._userService.userEdit(this.usuario).subscribe(
        response => {
          // edición usuario desde el formulario
        },
        error => {
          console.log(error);
        }
      )
    }
  }

  // si cancela emitimos un false para cerrar el modal de registro
  cancelar() {
    this.accionRealizada.emit(false);
  }

}
