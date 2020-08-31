import { Component, OnInit } from '@angular/core';
import { Premises } from 'src/app/modelos/Premises';
import { User } from 'src/app/modelos/User';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { PremisesService } from 'src/app/servicios/premises.service';

@Component({
  selector: 'app-edit-premises',
  templateUrl: './edit-premises.component.html',
  styleUrls: ['./edit-premises.component.css'],
  providers: [UsuarioService, PremisesService]
})
export class EditPremisesComponent implements OnInit {

  public local: Premises;
  public title;
  public usuario: User;
  public bAñadidos: boolean;

  public zoom: number;
  public latitude: number;
  public longitude: number;
  public latlongs: any = [];
  public latlong: any = {};

  constructor(
    private _premisesService: PremisesService,
    private _usuarioService: UsuarioService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.title = null;
  }

  ngOnInit() {
  }

  // Método para mostrar los datos del local en función del id de ruta
  // Si es un nuevo local la ruta muestra 0, sino mostrara el id y haremos un get del local por ese id
  ngAfterContentInit() {
    this._route.params.subscribe(
      params => {
        if (params['id'] == 0) {
          this.local = this._premisesService.premisesEmpty();
          this.local.userId = this._usuarioService.getIdentity().userId;
          this.title = 'Añadir nuevo local';
        } else {
          this._premisesService.getOnePremises(params['id']).subscribe(
            response => {
              this.local = response;
              this.title = 'Modificar local';
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
    if (this.local.premisesId == 0) {
      this._premisesService.addPremises(this.local).subscribe(
        response => {
          this._router.navigate(['locales']);
        },
        error => {
          console.log(error);
        }
      )
    } else {
      this._premisesService.editPremises(this.local).subscribe(
        response => {
          this._router.navigate(['locales']);
        },
        error => {
          console.log(error);
        }
      )
    }
  }

  cancelar() {
    this._router.navigate(['locales']);
  }
}
