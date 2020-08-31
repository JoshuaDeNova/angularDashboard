import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from '../servicios/global.service';

import { FixedAssets } from '../modelos/FixedAssets';

@Injectable()

export class FixedAssetsService {

    private url;

    constructor(
        public _http: HttpClient,
    ) {
        this.url = global.url;
    }

    // Servicio para crear objeto de inmovilizado vacio
    fixedAssetsEmpty(){
        return new FixedAssets(0, null, null, null, null, null);
    }

    // Servicio que realiza una petición para traer todos los inmovilizados del usuario
    getFixedAssets(userId): Observable<any>{
        return this._http.get(this.url + 'api/FixedAssets/userId?userId=' + userId); 
    }

    // Servicio que realiza una petición para traer un inmovilizado en concreto
    getOneFixedAssets(FixedAssetsId): Observable<any>{
        return this._http.get(this.url + 'api/FixedAssets/FixedAssetsId?FixedAssetsId=' + FixedAssetsId);
    }

    // Servicio que realiza una petición para insertar un nuevo inmovilizado
    addFixedAssets(FixedAssets: FixedAssets): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post<FixedAssets>(this.url + 'api/FixedAssets', FixedAssets, {headers: headers});
    }

    // Servicio que realiza una petición para actualizar un inmovilizado
    editFixedAssets(FixedAssets: FixedAssets): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put<FixedAssets>(this.url + 'api/FixedAssets', FixedAssets, {headers: headers});
    }
}