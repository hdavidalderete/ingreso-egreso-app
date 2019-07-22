import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';
import { AuthService } from './auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate() {
    return this.authService.isAuth();
  }

  canLoad() {
    return this.authService.isAuth().pipe(
      // escuchamos solo una vez por cada vez que quiere ingresar a la app y cancela la subscripcion
      take(1)
    );
  }

}
