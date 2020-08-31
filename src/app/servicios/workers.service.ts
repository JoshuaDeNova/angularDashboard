import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from '../servicios/global.service';

import { Worker } from '../modelos/Workers';

@Injectable()

export class WorkersService {

  private url;

  constructor(
    public _http: HttpClient,
  ) {
    this.url = global.url;
  }

      // Servicio para crear objeto de trabajador vacio
      WorkerEmpty(){
        return new Worker(0, null, null, null, null, null, null, null);
    }

    // Servicio que realiza una petición para traer todos los trabajadores del usuario
    getWorkers(userId): Observable<any>{
        return this._http.get(this.url + 'api/Workers/userId?userId=' + userId); 
    }

    // Servicio que realiza una petición para traer un trabajador en concreto
    getOneWorker(WorkerId): Observable<any>{
        return this._http.get(this.url + 'api/Workers/WorkersId?WorkersId=' + WorkerId);
    }

    // Servicio que realiza una petición para insertar un nuevo trabajador
    addWorker(Worker: Worker): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post<Worker>(this.url + 'api/Workers', Worker, {headers: headers});
    }

    // Servicio que realiza una petición para actualizar un trabajador
    editWorker(Worker: Worker): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put<Worker>(this.url + 'api/Workers', Worker, {headers: headers});
    }
}