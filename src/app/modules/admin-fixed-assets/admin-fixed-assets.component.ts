import { Component, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/modelos/User';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { FixedAssetsService } from 'src/app/servicios/fixedAssets.service';

@Component({
  selector: 'admin-fixed-assets',
  templateUrl: './admin-fixed-assets.component.html',
  styleUrls: ['./admin-fixed-assets.component.css'],
  providers: [UsuarioService, FixedAssetsService]
})
export class AdminFixedAssetsComponent implements OnInit {

    //Barra de búsqueda
    searchControl: FormControl = new FormControl();

    public inmovilizados;
    public miMensaje: String;
    public ocultaColumna: boolean;
    public usuario: User;
  
    constructor(
      private _usuarioService: UsuarioService,
      private _fixedAssetsService: FixedAssetsService,
      private _router: Router,
      private _route: ActivatedRoute
    ) {
      this.inmovilizados = [];
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
  
    // Primero sacamos los inmovilizados del usuario para mostrarlos en la tabla
    ngAfterContentInit() {
      this._fixedAssetsService.getFixedAssets(this.usuario.userId).subscribe(
        response => {
          this.inmovilizados = response;
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
  
      const columns = Object.keys(this.inmovilizados[0]);
      if (!columns.length) {
        return;
      }
  
      const rows = this.inmovilizados.filter(function (d) {
        for (let i = 0; i <= columns.length; i++) {
          const column = columns[i];
          if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
            return true;
          }
        }
      });
      this.inmovilizados = rows;
    }
  
    // si la pantalla es para móvil previo por si hay que renderizar
    isMobile(width) {
      if (width < 1000) {
        this.ocultaColumna = true;
      } else {
        this.ocultaColumna = false;
      }
    }
  
    // cuando elegimos el inmovilizado para que lo pueda editar en su momento
    click(event) {
      if (event.type == "click") {
        this._router.navigate(['inmovilizados/' + event.row.fixedAssetsId + '/editar']);
      }
    }
  
    // renderizado si se trata de una pantalla para móvil
    onResize(event) {
      this.isMobile(event.target.innerWidth);
    }

}
