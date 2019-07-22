import * as fromIE from './ingreso-egreso.action';
import { IngresoEgreso } from './ingreso-egreso.model';

export interface IngresoEgresoEstate {
    items: IngresoEgreso[];
}

const stateInit: IngresoEgresoEstate = {
    items: null
};

export function ingresoEgresoReducer(state = stateInit, action: fromIE.acciones): IngresoEgresoEstate {
    switch (action.type) {
        case fromIE.SET_ITEMS:
            return {
                items: [
                    ...action.items.map(item => ({ ...item }))
                ]
            };
        case fromIE.UNSET_ITEMS:
            return {
                items: []
            };
        default: return state;
    }
}
