import { Component, OnInit } from '@angular/core';
import { Utente } from '../model/utente';
import { UtentiService } from '../services/utenti.service';

@Component({
  selector: 'app-bacheca',
  templateUrl: './bacheca.component.html',
  styleUrls: ['./bacheca.component.scss']
})
export class BachecaComponent implements OnInit {
  utenti?: Utente[];

  constructor(
    private utentiService: UtentiService
  ) { }

  ngOnInit(): void {
    //Gestione title
    const titleElement = document.getElementById("title") as HTMLHeadingElement | null;

    if (titleElement) {
      // Abilita la modifica del contenuto
      titleElement.contentEditable = "true";

      // Seleziona tutto il testo quando si fa clic sul titolo
      titleElement.addEventListener("click", () => {
        titleElement.focus();
        document.execCommand("selectAll");
      });

      // Aggiorna il titolo quando si modifica il contenuto
      titleElement.addEventListener("input", () => {
        // Aggiorna il titolo solo se non è vuoto
        const newTitle = titleElement.textContent?.trim() || "";
        if (newTitle !== "") {
          // Aggiorna il nuovo titolo
        } else {
          // Ripristina il valore originale se il titolo è vuoto
          titleElement.textContent = "test";
        }
      });

      // Conferma il cambio del titolo premendo il tasto "Enter"
      titleElement.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          titleElement.blur(); // Perde il focus per confermare il cambio del titolo
        }
      });
    }
    // Fine Gestione title
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
}

