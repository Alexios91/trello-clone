export interface Utente {
    _id: string;
    nome: string;
    cognome: string;
    email: string;
}

export interface RegisterDto {
    nome: string;
    cognome: string;
    email: string;
    password: string;
    conferma_password: string;
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface LoggedUser {
    user: Utente;
    accessToken: string;
}