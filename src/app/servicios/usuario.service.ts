import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from '../servicios/global.service';

import { User } from '../modelos/User';

@Injectable()

export class UsuarioService {

  private url;

  constructor(
    public _http: HttpClient,
  ) {
    this.url = global.url;
  }

  // servicio que crea un Usuario vacío (new object)
  userEmpty() {
    return new User(0, null, null, null, null, null, null, null);
  }

  // servicio para conectar al usuario
  userLogin(email, password): Observable<any> {
    return this._http.get(this.url + 'api/User/login?email=' + email + '&password=' + password);
  }
  
  // servicio que registra un usuario
  userRegister(user: User): Observable<any>{
    console.log(user);
    // recuerda que tienes que pasar un objeto y no un array (recordar para documentar los errores)
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post<User>(this.url + 'api/User', user, {headers: headers});
  }

  // servicio que modifica los datos de usuario
  userEdit(user: User): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put<User>(this.url + 'api/User', user, {headers: headers});
  }

  // servicio almacena en localStorage los datos del usuario conectado
  setIdentity(identity) {
    if (identity == null) {
      localStorage.removeItem('identityUsuario');
    } else {
      localStorage.setItem('identityUsuario', JSON.stringify(identity));
    }
  }

  // servicio get de la identidad del usuario conectado, almacenada en localStorage
  getIdentity() {
    return (JSON.parse(localStorage.getItem('identityUsuario')));
  }
}