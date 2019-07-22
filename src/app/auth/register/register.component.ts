import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  cargando: boolean; // bandera servicio esperando respuesta y finalizado
  constructor(public authService: AuthService,
              public store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('ui').subscribe( state => {
      this.cargando = state.isLoading;
    });
  }

  onSubmit(data: any) {
    console.log(data);
    this.authService.crearUsuario(data.nombre, data.correo, data.password);
  }



}
