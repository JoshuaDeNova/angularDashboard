import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from '../servicios/global.service';

import { Business } from '../modelos/Business';

@Injectable()

export class BusinessService {

    private url;

    constructor(
        public _http: HttpClient,
    ) {
        this.url = global.url;
    }

    // Servicio para crear objeto de negocio vacio
    businessEmpty(){
        return new Business(0, null, null, null, null, null);
    }

    // Servicio que realiza una petición para traer todos los negocios del usuario
    getBusiness(userId): Observable<any>{
        return this._http.get(this.url + 'api/Business/userId?userId=' + userId); 
    }

    // Servicio que realiza una petición para traer un negocio en concreto
    getOneBusiness(businessId): Observable<any>{
        return this._http.get(this.url + 'api/Business/businessId?businessId=' + businessId);
    }

    // Servicio que realiza una petición para insertar un nuevo negocio
    addBusiness(business: Business): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post<Business>(this.url + 'api/Business', business, {headers: headers});
    }

    // Servicio que realiza una petición para actualizar un negocio
    editBusiness(business: Business): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put<Business>(this.url + 'api/Business', business, {headers: headers});
    }
}