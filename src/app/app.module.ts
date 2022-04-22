import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { ChatComponent, CitaPopup } from './chat/chat.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { CancelCitaPopup, CitaComponent } from './cita/cita.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    PageNotFoundComponent,
    LandingComponent,
    ProfileComponent,
    ChatComponent,
    CitaPopup,
    CitaComponent,
    CancelCitaPopup,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgCircleProgressModule.forRoot({
      radius: 50,
      outerStrokeWidth: 16,
      innerStrokeWidth: 0,
      outerStrokeColor: "ghostwhite",
      titleFontWeight: '900',
      titleColor: "ghostwhite",
      showSubtitle: false,
      showUnits: false,
      renderOnClick: false,
      animation: false,
      lazy : false,
      clockwise: false,
    }),
    BrowserAnimationsModule,
    AngularMaterialModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
