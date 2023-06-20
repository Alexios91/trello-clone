import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../model/utente';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showNav = false;
  showPassword: boolean = false;

  model: LoginDto = { email: '', password: '' }

  frm = new FormGroup({
    email: new FormControl("", Validators.email),
    password: new FormControl("", Validators.required),
  })

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Verifica che l'utente non sia già loggato
    if (this.authService.isLogged()) {
      this.router.navigateByUrl('/lavoro')
    }
  }

  login() {
    if (this.frm.valid) {
      this.authService.login(this.model).subscribe(
        (u: any) => {
          this.authService.setLoggedUser(u);
          this.router.navigateByUrl("/lavoro");
          this.showNav = true; // Imposta showNav su true dopo il login
        },
        (error: any) => {
          alert("Username o password errati");
        }
      );
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
