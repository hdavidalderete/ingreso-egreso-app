import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.accion';
import { SET_ACTIONS_ACTIVE } from '@ngrx/store-devtools/src/actions';
import { SetUserAction, UnSetUserAction } from './auth.accion';
import { Subscription } from 'rxjs';
import { UnSetItemsAction } from '../ingreso-egreso/ingreso-egreso.action';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubscription: Subscription = new Subscription();
  private usuario: User;

  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private afDB: AngularFirestore,
              private store: Store<AppState>
  ) { }

  initAuthListener() {
    this.afAuth.authState.subscribe(fbUser => {
      if (fbUser) {
        // escuchamos si hay algun cambio en el usuario
        this.userSubscription = this.afDB.doc(`${fbUser.uid}/usuario`)
          .valueChanges()
          .subscribe((usuarioObj: any) => {
            const user = new User(usuarioObj);
            this.store.dispatch(new SetUserAction(user));
            // guardamos los datos del usuario actual
            this.usuario = user;
          });
      }  else {
        // cuando el usuario se desloguea dejamos de escuchar sus cambios
        this.usuario = null;
        this.userSubscription.unsubscribe();
      }
    });
  }

  crearUsuario(nombres: string, email: string, password: string) {
    this.store.dispatch(new ActivarLoadingAction());
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(resp => {
        const user: User = {
          nombre: nombres,
          email: resp.user.email,
          uid: resp.user.uid
        };
        this.afDB.doc(`${user.uid}/usuario`)
          .set(user)
          .then(() => {
            this.router.navigate(['/']);
            this.store.dispatch(new DesactivarLoadingAction());
          }).catch();

      }).catch(error => {
        Swal.fire('error en el login', error.message, 'error');
        this.store.dispatch(new DesactivarLoadingAction());
      });
  }

  login(email: string, password: string) {
    this.store.dispatch(new ActivarLoadingAction());
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(resp => {
        this.store.dispatch(new DesactivarLoadingAction());
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.store.dispatch(new DesactivarLoadingAction());
        Swal.fire('error en el login', error.message, 'error');
      });
  }

  logout() {
    this.store.dispatch(new UnSetUserAction());
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
  }

  // retornar al guard el estado de la sesion
  isAuth() {
    return this.afAuth.authState.pipe(
      map(fbUser => {
        if (fbUser == null) {
          this.router.navigate(['/login']);
        }
        return fbUser != null;
      })
    );
  }

  getUser() {
    return { ...this.usuario };
  }
}
