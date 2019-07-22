import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from './ingreso-egreso.model';

@Pipe({
  name: 'ingresoEgreso'
})
export class IngresoEgresoPipe implements PipeTransform {

  transform(list: IngresoEgreso[]): IngresoEgreso[] {
    list.sort(
      (a: IngresoEgreso, b: IngresoEgreso) => {
        if (a.tipo === 'ingreso') {
          return -1;
        } else {
          return 1;
        }
      });
    return list;
  }

}
