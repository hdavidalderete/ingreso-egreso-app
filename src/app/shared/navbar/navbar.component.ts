import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy{

  nombreUsuario = '';
  subscripcion: Subscription = new Subscription();
  constructor(public authService: AuthService, public store: Store<AppState>) { }

  ngOnInit() {
    this.subscripcion = this.store.select('auth').subscribe(
      data => {
        if (data.user) {
          this.nombreUsuario = data.user.nombre;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }

}
