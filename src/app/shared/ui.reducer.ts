import * as fromUI from './ui.accion';
import { from } from 'rxjs';

export interface State {
    isLoading: boolean;
}

const stateInit: State = {
    isLoading: false
};

export function uiReducer(state = stateInit, action: fromUI.acciones): State {
    switch (action.type) {
        case fromUI.ACTIVAR_LOGIN:
            return {
                isLoading: true
            };
        case fromUI.DESACTIVA_LOADING:
            return {
                isLoading: false
            };
        default: return state;
    }
}
