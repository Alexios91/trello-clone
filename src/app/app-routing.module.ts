import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BachecaComponent } from './bacheca/bacheca.component';
import { LavoroComponent } from './lavoro/lavoro.component';
import { ListaComponent } from './lista/lista.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'lavoro', component: LavoroComponent, canActivate: [AuthGuard] },
  { path: 'bacheca', component: BachecaComponent, canActivate: [AuthGuard] },
  { path: 'lista', component: ListaComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
