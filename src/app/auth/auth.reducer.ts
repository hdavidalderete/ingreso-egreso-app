import * as fromAuth from './auth.accion';
import { from } from 'rxjs';
import { User } from './user.model';

export interface AuthState {
    user: User;
}

const stateInit: AuthState = {
    user: null
};

export function authReducer(state = stateInit, action: fromAuth.acciones): AuthState {
    switch (action.type) {
        case fromAuth.SET_USER:
            return {
                user: { ...action.user }
            };
        case fromAuth.UNSET_USER:
            return {
                user: null
            };
        default: return state;
    }
}
