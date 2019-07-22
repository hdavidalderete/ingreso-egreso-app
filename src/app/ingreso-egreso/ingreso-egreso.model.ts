export class IngresoEgreso {
    descripcion: string;
    monto: number;
    tipo: string;
    // parametro opcional
    uid?: string;

    constructor(ingresoEgreso: IngresoEgresoInt) {
        this.descripcion = ingresoEgreso && ingresoEgreso.descripcion || null;
        this.monto = ingresoEgreso && ingresoEgreso.monto || null;
        this.tipo = ingresoEgreso && ingresoEgreso.tipo || null;
        // this.uid = ingresoEgreso && ingresoEgreso.uid || null;
    }
}

interface IngresoEgresoInt {
    descripcion: string;
    monto: number;
    tipo: string;
    uid?: string;
}
