import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { BusinessService } from 'src/app/servicios/business.service';

@Component({
  selector: 'app-admin-business',
  templateUrl: './admin-business.component.html',
  styleUrls: ['./admin-business.component.css'],
  providers: [UsuarioService, BusinessService]
})
export class AdminBusinessComponent implements OnInit {

  //Barra de búsqueda
  searchControl: FormControl = new FormControl();

  public negocios;
  public miMensaje: String;
  public ocultaColumna: boolean;
  public usuario;

  constructor(
    private _usuarioService: UsuarioService,
    private _businessService: BusinessService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.negocios = [];
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

  // Primero sacamos los negocios del usuario para mostrarlos en la tabla
  ngAfterContentInit() {
    this._businessService.getBusiness(this.usuario.userId).subscribe(
      response => {
        this.negocios = response;
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

    const columns = Object.keys(this.negocios[0]);
    if (!columns.length) {
      return;
    }

    const rows = this.negocios.filter(function (d) {
      for (let i = 0; i <= columns.length; i++) {
        const column = columns[i];
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });
    this.negocios = rows;
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
      this._router.navigate(['negocios/' + event.row.businessId + '/editar']);
    }
  }

  // renderizado si se trata de una pantalla para móvil
  onResize(event) {
    this.isMobile(event.target.innerWidth);
  }
}
