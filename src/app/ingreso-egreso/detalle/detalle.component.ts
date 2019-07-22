import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit , OnDestroy {
  listIngresoEgreso: IngresoEgreso[];
  ingresoEgresoSubscription: Subscription = new Subscription();
  constructor(private store: Store<AppState>, private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.ingresoEgresoSubscription = this.store.select('ingresoEgreso').subscribe(
      data => {
        if (data.items) {
          this.listIngresoEgreso = data.items;
        }
      }
    );
  }

  eliminarIngresoEgreso(item: IngresoEgreso) {
    this.ingresoEgresoService.eliminarIngreso(item.uid)
    .then(
      data => {
        Swal.fire('Item Eliminado',item.descripcion, 'success');
      }
    ).catch();
  }

  ngOnDestroy(): void {
    this.ingresoEgresoSubscription.unsubscribe();
  }

}
