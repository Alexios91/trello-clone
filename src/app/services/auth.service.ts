import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utente, LoginDto, RegisterDto, LoggedUser } from '../model/utente';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private utente?: Utente

  constructor(
    private http: HttpClient,
  ) { }

  login(utente: LoginDto): Observable<LoggedUser> {
    return this.http.post<LoggedUser>(environment.USER_API_BASE_URL + "login", utente);
  }

  register(utente: RegisterDto): Observable<LoggedUser> {
    return this.http.post<LoggedUser>(environment.USER_API_BASE_URL + "register", utente);
  }

  // Memorizzare l'utente autenticato nel Local Storage
  setLoggedUser(user: LoggedUser): void {
    localStorage.setItem("user", JSON.stringify(user));
  }

  // Recuperare l'utente autenticato dal Local Storage
  getLoggedUser(): LoggedUser | null {
    const userStorage = localStorage.getItem("user");
    if (userStorage !== null) {
      const u: LoggedUser = JSON.parse(userStorage);
      return u;
    } else {
      return null;
    }
  }

  isLogged() {
    return this.getLoggedUser() !== null && this.utente;
  }

  logout() {
    localStorage.removeItem('user');
    sessionStorage.clear();
    this.utente = undefined;
  }
}
