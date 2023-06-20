import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Utente } from '../model/utente';
import { UtentiService } from '../services/utenti.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {
  utenti?: Utente[];

  constructor(
    private utentiService: UtentiService
  ) { }

  ngOnInit(): void {
    // Gestione creazione nuova card
    const cardGroup = document.querySelector(".cardGroup") as HTMLElement;

    cardGroup.addEventListener("keydown", (event: KeyboardEvent) => {
      const target = event.target as HTMLInputElement;

      if (event.key === "Enter" && target.value !== "") {
        if (target.id === "newCards") {
          // Ottieni il nuovo titolo della card
          const newTitle = target.value;

          // Clona la card esistente
          const existingCard = cardGroup.querySelector(".card") as HTMLElement;
          const newCard = existingCard.cloneNode(true) as HTMLElement;

          // Imposta il nuovo titolo nella card clonata
          const titleInput = newCard.querySelector(".cardtitle") as HTMLInputElement;
          titleInput.value = newTitle;

          // Inserisci la nuova card nel gruppo
          cardGroup.insertBefore(newCard, target.parentNode);

          // Svuota il campo "newCards"
          target.value = "";
        }
      }
    });
    // Fine Gestione creazione nuova card

    // Gestione creazione nuova cardList
    const cardListInput = document.getElementById('cardList') as HTMLInputElement;
    cardListInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        // Ottieni il valore dell'input cardList
        const value = cardListInput.value.trim();

        if (value !== '') {
          // Crea un nuovo container per l'input
          const inputContainer = document.createElement('div');
          inputContainer.className = 'inputContainer';

          // Crea un nuovo input
          const newInput = this.createNewInput(value);

          // Crea un pulsante per eliminare l'input
          const deleteButton = this.deleteButton(() => {
            inputContainer.remove();
          });

          // Aggiungi l'input e il pulsante al container
          inputContainer.appendChild(newInput);
          inputContainer.appendChild(deleteButton);

          // Aggiungi il container al padre dell'input cardList
          cardListInput.parentNode?.appendChild(inputContainer);

          // Svuota il campo "cardList"
          cardListInput.value = '';
        }
      }
    });
    // Fine Gestione creazione nuova cardList

    this.caricaUtenti();
  };

  createNewInput(value: string): HTMLInputElement {
    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.id = 'newCardList';
    newInput.className = 'textContent newCardList';
    newInput.value = value;

    return newInput;
  }

  createNewCard(value: string): HTMLElement {
    const newCard = document.createElement('div');
    newCard.className = 'card';
    newCard.id = 'newCards';
    newCard.appendChild(this.createNewInput(value));
    return newCard;
  }

  deleteButton(clickHandler: () => void): HTMLButtonElement {
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteButton.className = 'deleteButton';
    deleteButton.addEventListener('click', clickHandler);

    return deleteButton;
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