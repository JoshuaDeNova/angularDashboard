import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from '../servicios/global.service';

import { Premises } from '../modelos/Premises';

@Injectable()

export class PremisesService {

    private url;

    constructor(
        public _http: HttpClient,
    ) {
        this.url = global.url;
    }

    // Servicio para crear objeto de negocio vacio
    premisesEmpty(){
        return new Premises(0, null, null, null);
    }

    // Servicio que realiza una petición para traer todos los negocios del usuario
    getPremises(userId): Observable<any>{
        return this._http.get(this.url + 'api/Premises/userId?userId=' + userId); 
    }

    // Servicio que realiza una petición para traer un negocio en concreto
    getOnePremises(PremisesId): Observable<any>{
        return this._http.get(this.url + 'api/Premises/PremisesId?PremisesId=' + PremisesId);
    }

    // Servicio que realiza una petición para insertar un nuevo negocio
    addPremises(Premises: Premises): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post<Premises>(this.url + 'api/Premises', Premises, {headers: headers});
    }

    // Servicio que realiza una petición para actualizar un negocio
    editPremises(Premises: Premises): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put<Premises>(this.url + 'api/Premises', Premises, {headers: headers});
    }
}