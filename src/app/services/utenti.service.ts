import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { LoggedUser, Utente } from '../model/utente';

@Injectable({
  providedIn: 'root'
})
export class UtentiService {
  utenti: any;
  inizialiUtenteLoggato!: string | null;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getUtenteLoggato(): Utente | null {
    const loggedUser: LoggedUser | null = this.authService.getLoggedUser();
    if (loggedUser && loggedUser.user) {
      return loggedUser.user;
    }
    return null;
  }

  getInizialiUtenteLoggato(): string {
    const utente = this.authService.getLoggedUser()?.user; // Ottiene l'utente loggato dal AuthService
    if (utente) {
      const inizialeNome = utente.nome.charAt(0).toUpperCase();
      const inizialeCognome = utente.cognome.charAt(0).toUpperCase();
      return inizialeNome + inizialeCognome;
    } else {
      return '';
    }
  }

  getUtenti(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/users');
  }
}
