import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { WorkersService } from 'src/app/servicios/workers.service';
import { Router, ActivatedRoute } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { User } from 'src/app/modelos/User';

@Component({
  selector: 'admin-workers',
  templateUrl: './admin-workers.component.html',
  styleUrls: ['./admin-workers.component.css'],
  providers: [UsuarioService, WorkersService]
})
export class AdminWorkersComponent implements OnInit {

  //Barra de búsqueda
  searchControl: FormControl = new FormControl();

  public trabajadores;
  public miMensaje: String;
  public ocultaColumna: boolean;
  public usuario: User;

  constructor(
    private _usuarioService: UsuarioService,
    private _trabajadoresService: WorkersService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.trabajadores = [];
    this.miMensaje = 'No hay datos para mostrar';
    this.usuario = this._usuarioService.getIdentity();
  }

  ngOnInit() {
    // acción del controlador de búsqueda
    this.searchControl.valueChanges
      .pipe(debounceTime(200))
      .subscribe(value => {
        this.filtrarDatos(value);
      });
  }

  // Primero sacamos los workers del usuario para mostrarlos en la tabla
  ngAfterContentInit() {
    this._trabajadoresService.getWorkers(this.usuario.userId).subscribe(
      response => {
        this.trabajadores = response;
      },
      error => {
        console.log(error);
      }
    )
  }

  // Funcón filtro de búsqueda que controla las filas de la ngx-datatable
  filtrarDatos(val) {
    if (val) {
      val = val.toLowerCase();
    } else {
      return true;
    }

    const columns = Object.keys(this.trabajadores[0]);
    if (!columns.length) {
      return;
    }

    const rows = this.trabajadores.filter(function (d) {
      for (let i = 0; i <= columns.length; i++) {
        const column = columns[i];
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });
    this.trabajadores = rows;
  }

  // si la pantalla es para móvil previo por si hay que renderizar
  isMobile(width) {
    if (width < 1000) {
      this.ocultaColumna = true;
    } else {
      this.ocultaColumna = false;
    }
  }

  // cuando elegimos el negocio para que lo pueda editar en su momento
  click(event) {
    if (event.type == "click") {
      this._router.navigate(['trabajadores/' + event.row.workersId + '/editar']);
    }
  }

  // renderizado si se trata de una pantalla para móvil
  onResize(event) {
    this.isMobile(event.target.innerWidth);
  }

}
