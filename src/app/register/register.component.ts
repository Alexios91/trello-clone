import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../model/utente';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  model: RegisterDto = { nome: '', cognome: '', email: '', password: '', conferma_password: '' }

  frm = new FormGroup({
    nome: new FormControl("", Validators.required),
    cognome: new FormControl("", Validators.required),
    email: new FormControl("", Validators.email),
    password: new FormControl("", Validators.required),
    conferma_password: new FormControl("", Validators.required),
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.authService.isLogged()) {
      this.router.navigateByUrl('/lavoro')
    }
  }

  register() {
    if (this.frm.valid) {
      this.authService.register(this.model).subscribe(u => {
        this.authService.setLoggedUser(u);
        this.router.navigateByUrl("/lavoro");
      });
    }
  }
}
