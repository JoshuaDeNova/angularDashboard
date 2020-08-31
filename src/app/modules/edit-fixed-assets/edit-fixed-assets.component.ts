import { Component, OnInit } from '@angular/core';
import { FixedAssets } from 'src/app/modelos/FixedAssets';
import { User } from 'src/app/modelos/User';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { FixedAssetsService } from 'src/app/servicios/fixedAssets.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-fixed-assets',
  templateUrl: './edit-fixed-assets.component.html',
  styleUrls: ['./edit-fixed-assets.component.css'],
  providers: [UsuarioService, FixedAssetsService]
})
export class EditFixedAssetsComponent implements OnInit {

  public inmovilizado: FixedAssets;
  public title;
  public usuario: User;
  public bAñadidos: boolean;

  public zoom: number;
  public latitude: number;
  public longitude: number;
  public latlongs: any = [];
  public latlong: any = {};

  constructor(
    private _fixedAssetsService: FixedAssetsService,
    private _usuarioService: UsuarioService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.title = null;
  }

  ngOnInit() {
  }

  // Método para mostrar los datos del inmovilizado en función del id de ruta
  // Si es un nuevo inmovilizado la ruta muestra 0, sino mostrara el id y haremos un get del inmovilizado por ese id
  ngAfterContentInit() {
    this._route.params.subscribe(
      params => {
        if (params['id'] == 0) {
          this.inmovilizado = this._fixedAssetsService.fixedAssetsEmpty();
          this.inmovilizado.userId = this._usuarioService.getIdentity().userId;
          this.title = 'Añadir nuevo inmovilizado';
        } else {
          this._fixedAssetsService.getOneFixedAssets(params['id']).subscribe(
            response => {
              this.inmovilizado = response;
              this.title = 'Modificar inmovilizado';
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
    if (this.inmovilizado.fixedAssetsId == 0) {
      this._fixedAssetsService.addFixedAssets(this.inmovilizado).subscribe(
        response => {
          this._router.navigate(['inmovilizados']);
        },
        error => {
          console.log(error);
        }
      )
    } else {
      this._fixedAssetsService.editFixedAssets(this.inmovilizado).subscribe(
        response => {
          this._router.navigate(['inmovilizados']);
        },
        error => {
          console.log(error);
        }
      )
    }
  }

  cancelar() {
    this._router.navigate(['inmovilizados']);
  }

}
