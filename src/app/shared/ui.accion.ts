import { Action } from '@ngrx/store';



export const ACTIVAR_LOGIN = '[UI Loading] Cargando...';
export const DESACTIVA_LOADING = '[UI Loading] Fin de Carga';

export class ActivarLoadingAction implements Action {
    readonly type = ACTIVAR_LOGIN;
}

export class DesactivarLoadingAction implements Action {
    readonly type = DESACTIVA_LOADING;
}

export type acciones = ActivarLoadingAction | DesactivarLoadingAction;
