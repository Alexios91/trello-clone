import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Utente } from '../model/utente';
import { Sfondo } from "../model/sfondi";
import { UtentiService } from '../services/utenti.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  showNav = false;
  showLog = false;

  utenteLoggato: Utente | null = null;
  iniziali!: string;
  searchQuery: string = '';

  sfondi: Sfondo[] = [
    { url: 'https://images.unsplash.com/photo-1672243777342-0698e84a41fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80' },
    { url: 'https://images.unsplash.com/photo-1686080976644-552603bd8149?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80' },
    { url: 'https://images.unsplash.com/photo-1686065910906-fcd513b9eb88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80' },
    { url: 'https://images.unsplash.com/photo-1678524492872-52f846f381a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80' }
  ];
  sfondoSelezionato: Sfondo | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private utentiService: UtentiService
  ) {
  }

  ngOnInit(): void {
    // Eventi di navigazione del router
    this.router.events.subscribe((event) => {
      // Verifica se l'evento corrente è una NavigationEnd
      if (event instanceof NavigationEnd) {
        // Ottieni l'URL corrente dopo eventuali reindirizzamenti
        const url = event.urlAfterRedirects;

        // Verifica se l'URL include '/login' o '/register'
        // per determinare se mostrare o nascondere la navbar
        this.showNav = !(url.includes('/login') || url.includes('/register'));

        // Verifica se l'URL è '/' (home) o '/register'
        // per determinare se mostrare il div 'navLog' nella navbar
        this.showLog = url === '/' || url === '/register';
      }
      // Fine Eventi di navigazione del router

      // Dati utente Loggato
      this.utenteLoggato = this.utentiService.getUtenteLoggato();
      this.iniziali = this.utentiService.getInizialiUtenteLoggato();
      // Fine Dati utente Loggato
    });
  }


  submitSearch() {
    console.log(this.searchQuery);// Azione di ricerca
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/')
  }

  selezionaSfondo(sfondo: Sfondo): void {
    this.sfondoSelezionato = sfondo;
  }
}