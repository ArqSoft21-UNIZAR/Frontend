import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { CitaComponent } from './cita/cita.component';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';
import { LoggedGuard } from './logged.guard';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: "", component: LandingComponent},
  { path: "home", component: HomeComponent, canActivate: [LoggedGuard]},
  { path: "login", component: LoginComponent},
  { path: "register", component: RegisterComponent},
  { path: "profile/:id", component: ProfileComponent, canActivate: [LoggedGuard]},
  { path: "chat/:id", component: ChatComponent, canActivate: [LoggedGuard]},
  { path: "cita/:id", component: CitaComponent, canActivate: [LoggedGuard]},
  { path: "**", component: PageNotFoundComponent } //NOTE: Este tiene que ser SIEMPRE el ultimo
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
