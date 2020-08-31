import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [UsuarioService]
})
export class SidebarComponent implements OnInit {

  public usuario: Object;

  constructor(
    private _userService: UsuarioService
  ) {}

  ngOnInit() {
    this.usuario = this._userService.getIdentity();
  }

}
