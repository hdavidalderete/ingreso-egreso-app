import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.accion';
import * as fromIE from './ingreso-egreso.reducer';
@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.css']
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  ingresoEgreso: FormGroup;
  tipo = 'ingreso';
  cargando: boolean;
  loadingSubcripcion: Subscription = new Subscription();
  constructor(private ingresoEgresoService: IngresoEgresoService,
              private store: Store<fromIE.AppStateIE>) { }

  ngOnInit() {
    this.ingresoEgreso = new FormGroup({
      descripcion: new FormControl('', Validators.required),
      monto: new FormControl(0, Validators.min(0)),
    });
    this.loadingSubcripcion = this.store.select('ui').subscribe( ui => {
      this.cargando = ui.isLoading;
    });
  }

  crearIngresoEgreso() {
    this.store.dispatch(new ActivarLoadingAction());
    console.log(this.ingresoEgreso.value);
    const ingresoEgreso = new IngresoEgreso({ ...this.ingresoEgreso.value, tipo: this.tipo });
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso).then(data => {
      this.store.dispatch(new DesactivarLoadingAction());
      Swal.fire('Creado', ingresoEgreso.descripcion, 'success');
      this.ingresoEgreso.reset();
    });
  }

  ngOnDestroy(): void {
    this.loadingSubcripcion.unsubscribe();
  }

}
