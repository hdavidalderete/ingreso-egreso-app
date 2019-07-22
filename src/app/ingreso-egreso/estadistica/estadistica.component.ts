import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Label } from 'ng2-charts';
import { ChartType } from 'chart.js';
import * as fromIE from '../ingreso-egreso.reducer';
@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit {
  // Doughnut
  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: number[] = [];
  public doughnutChartType: ChartType = 'doughnut';
  public chartColors: any[] = [
    { backgroundColor: ['#10E931', '#F22525'] }
  ];
  // data estadisticas
  ingreso: number;
  egreso: number;

  cuantosIngresos: number;
  cuantosEgresos: number;
  subscription: Subscription = new Subscription();
  constructor(private store: Store<fromIE.AppStateIE>) { }

  ngOnInit() {
    this.subscription = this.store.select('ingresoEgreso').subscribe(
      ingresoEgresos => {
        if (ingresoEgresos.items != null) {
          this.contarIngresoEgreso(ingresoEgresos.items);
        }
      }
    );
  }

  contarIngresoEgreso(items: IngresoEgreso[]) {
    this.ingreso = 0;
    this.egreso = 0;
    this.cuantosEgresos = 0;
    this.cuantosIngresos = 0;
    items.forEach(
      item => {
        if (item.tipo === 'ingreso') {
          this.ingreso += item.monto;
          this.cuantosIngresos++;
        } else {
          this.egreso += item.monto;
          this.cuantosEgresos++;
        }
      }
    );
    this.doughnutChartData = [this.ingreso, this.egreso];
  }

}
