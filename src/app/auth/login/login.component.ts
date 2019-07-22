import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  cargando: boolean;
  constructor(private authServices: AuthService,
              public store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('ui').subscribe( state => {
      this.cargando = state.isLoading;
    });
  }

  onSubmit(data: any) {
    this.authServices.login(data.email, data.password);
  }



}
