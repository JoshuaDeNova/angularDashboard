import { Component, OnInit, ViewChild, ViewChildren, ElementRef, NgZone } from '@angular/core';
import { BusinessService } from 'src/app/servicios/business.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/modelos/User';
import { Business } from 'src/app/modelos/Business';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import {} from 'googlemaps';

@Component({
  selector: 'edit-business',
  templateUrl: './edit-business.component.html',
  styleUrls: ['./edit-business.component.css'],
  providers: [BusinessService, UsuarioService]
})
export class EditBusinessComponent implements OnInit {

  public negocio: Business;
  public title;
  public usuario: User;
  public bAñadidos: boolean;

  @ViewChild('search', {static: false})
  public searchElementRef: ElementRef;

  public zoom: number;
  public latitude: number;
  public longitude: number;
  public latlongs: any = [];
  public latlong: any = {};
  public searchControl: FormControl;

  constructor(
    private _mapsAPILoader: MapsAPILoader,
    private _ngZone: NgZone,
    private _businessService: BusinessService,
    private _usuarioService: UsuarioService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.title = null;
  }

  ngOnInit() {
    this.zoom = 8;
    this.latitude = 41.6560600;
    this.longitude = -0.8773400;

    this.searchControl = new FormControl();
    this.setCurrentPosition();

    this._mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: [],
        componentRestrictions: {'country':'ES'}
      });
      autocomplete.addListener('place_changed', () => {
        this._ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if(place.geometry == undefined || place.geometry == null){
            return;
          }

          const latlong = {
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng()
          };

          this.latlongs.push(latlong);
          this.searchControl.reset();
        });
      });
    });
  }

  private setCurrentPosition(){
    if('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
      });
    }
  }

  // Método para mostrar los datos del negocio en función del id de ruta
  // Si es un nuevo negocio la ruta muestra 0, sino mostrara el id y haremos un get del negocio por ese id
  ngAfterContentInit() {
    this._route.params.subscribe(
      params => {
        if (params['id'] == 0) {
          this.negocio = this._businessService.businessEmpty();
          this.negocio.userId = this._usuarioService.getIdentity().userId;
          this.title = 'Añadir nuevo negocio';
        } else {
          this._businessService.getOneBusiness(params['id']).subscribe(
            response => {
              this.negocio = response;
              this.title = 'Modificar negocio';
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
    if (this.negocio.businessId == 0) {
      this._businessService.addBusiness(this.negocio).subscribe(
        response => {
          this._router.navigate(['negocios']);
        },
        error => {
          console.log(error);
        }
      )
    } else {
      this._businessService.editBusiness(this.negocio).subscribe(
        response => {
          this._router.navigate(['negocios']);
        },
        error => {
          console.log(error);
        }
      )
    }
  }

  cancelar() {
    this._router.navigate(['negocios']);
  }
}
