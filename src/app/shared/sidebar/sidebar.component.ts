import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from 'src/app/ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  nombreUsuario = '';
  subscripcion: Subscription = new Subscription();
  constructor(public authService: AuthService, public store: Store<AppState>,
              public ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.store.select('auth').subscribe(
      data => {
        if (data.user) {
          this.nombreUsuario = data.user.nombre;
        }
      }
    );
  }

  cerrarSesion() {
    this.authService.logout();
    this.ingresoEgresoService.cancelarSubscription();
  }

  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }
}
