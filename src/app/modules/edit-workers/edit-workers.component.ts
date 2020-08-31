import { Component, OnInit } from '@angular/core';
import { Worker } from '../../modelos/Workers'
import { User } from 'src/app/modelos/User';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { WorkersService } from 'src/app/servicios/workers.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'edit-workers',
  templateUrl: './edit-workers.component.html',
  styleUrls: ['./edit-workers.component.css'],
  providers: [UsuarioService, WorkersService]
})
export class EditWorkersComponent implements OnInit {

  public trabajador: Worker;
  public title;
  public usuario: User;
  public bAñadidos: boolean;

  public zoom: number;
  public latitude: number;
  public longitude: number;
  public latlongs: any = [];
  public latlong: any = {};

  constructor(
    private _workersService: WorkersService,
    private _usuarioService: UsuarioService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.title = null;
  }

  ngOnInit() {
  }

  // Método para mostrar los datos del trabajador en función del id de ruta
  // Si es un nuevo trabajador la ruta muestra 0, sino mostrara el id y haremos un get del trabajador por ese id
  ngAfterContentInit() {
    this._route.params.subscribe(
      params => {
        if (params['id'] == 0) {
          this.trabajador = this._workersService.WorkerEmpty();
          this.trabajador.userId = this._usuarioService.getIdentity().userId;
          this.title = 'Añadir nuevo trabajador';
        } else {
          this._workersService.getOneWorker(params['id']).subscribe(
            response => {
              this.trabajador = response;
              this.title = 'Modificar trabajador';
            },
            error => {
              console.log(error);
            }
          )
        }
      }
    )
  }

  // ahora realizamos el onSubmit, si es el id 0 creamos uno nuevo
  // si es distinto de 0 entonces se trata de un update
  onSubmit() {
    if (this.trabajador.workersId == 0) {
      this._workersService.addWorker(this.trabajador).subscribe(
        response => {
          this._router.navigate(['trabajadores']);
        },
        error => {
          console.log(error);
        }
      )
    } else {
      this._workersService.editWorker(this.trabajador).subscribe(
        response => {
          this._router.navigate(['trabajadores']);
        },
        error => {
          console.log(error);
        }
      )
    }
  }

  cancelar() {
    this._router.navigate(['trabajadores']);
  }

}
