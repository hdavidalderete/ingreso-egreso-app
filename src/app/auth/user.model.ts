

export class User {
    nombre: string;
    email: string;
    uid: string;
    constructor(user: DataUser) {
        this.nombre = user && user.nombre || null;
        this.email = user && user.email || null;
        this.uid = user && user.uid || null;
    }
}

interface DataUser {
    uid: string;
    email: string;
    nombre: string;
}
