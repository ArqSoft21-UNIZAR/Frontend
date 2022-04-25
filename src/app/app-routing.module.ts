import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { CitaComponent } from './components/cita/cita.component';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoggedGuard } from 'src/app/guards/logged.guard';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';

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
