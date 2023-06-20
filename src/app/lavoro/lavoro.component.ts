import { Component, OnInit } from '@angular/core';
import { Sfondo } from '../model/sfondi';
import { Utente } from '../model/utente';
import { UtentiService } from '../services/utenti.service';

@Component({
  selector: 'app-lavoro',
  templateUrl: './lavoro.component.html',
  styleUrls: ['./lavoro.component.scss']
})
export class LavoroComponent implements OnInit {
  utenti?: Utente[];

  sfondi: Sfondo[] = [
    { url: 'https://images.unsplash.com/photo-1672243777342-0698e84a41fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80' },
    { url: 'https://images.unsplash.com/photo-1686080976644-552603bd8149?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80' },
    { url: 'https://images.unsplash.com/photo-1686065910906-fcd513b9eb88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80' },
    { url: 'https://images.unsplash.com/photo-1678524492872-52f846f381a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80' }
  ];
  sfondoSelezionato: Sfondo | null = null;

  constructor(
    private utentiService: UtentiService
  ) { }

  ngOnInit(): void {
    this.caricaUtenti();
  }

  caricaUtenti() {
    this.utentiService.getUtenti().subscribe(
      (data: any[]) => {
        this.utenti = data;
      },
      (error) => {
        console.error('Si è verificato un errore durante il recupero degli utenti:', error);
      }
    );
  }

  selezionaSfondo(sfondo: Sfondo): void {
    this.sfondoSelezionato = sfondo;
  }
}
