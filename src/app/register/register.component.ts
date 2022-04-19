import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loading: boolean = false;
  //Form
  email: string = "";
  name: string = "";
  surname: string = "";
  password: string = "";
  confirmPassword: string = "";
  provincia: string = "";
  gender: string = "";
  fnacimiento: Date = new Date();
  tagGood: Array<string> = [];
  tagBad: Array<string> = [];

  
  //Error handling
  passwordError: boolean = false;
  serviceError: boolean = false;
  serviceErrorMessage: string = "";
  userError: boolean = false;

  constructor(public userService: UsersService, public router: Router, public utilityService: UtilityService) { }

  ngOnInit(): void {
  }

  register() {
    if(this.password != this.confirmPassword) {
      this.passwordError = true;
      return;
    }
    this.passwordError = false;
    
    this.loading = true;
    this.userService.register(this.email, this.password,this.name, this.surname, this.gender, this.fnacimiento, this.provincia, this.tagGood[0], this.tagGood[1], this.tagGood[2], this.tagBad[0], this.tagBad[1], this.tagBad[2]).subscribe({
      next: (v) => {
        this.userService.setToken(this.email);
        // NOTE(Marcos): Para borrar la cookie (hacer logout): this.cookies.delete("token");
        this.utilityService.goHome();
      },
      error: (e) => {
        this.loading = false;
        console.error(e)
        this.serviceError = true
        this.serviceErrorMessage = e.message
      }
    });
  }

  validate() {
    return this.email == ""
    || this.password == ""
    || this.confirmPassword == ""
    || this.name == ""
    || this.surname == ""
    || this.tagBad[0] == undefined
    || this.tagGood[0] == undefined
    || this.gender == ""
    || this.provincia == ""
  }

  public provincia_opciones = [
    "Álava",
    "Albacete",
    "Alicante",
    "Almería",
    "Ávila",
    "Badajoz",
    "Illes Balears",
    "Barcelona",
    "Burgos",
    "Cáceres",
    "Cádiz",
    "Castelló",
    "Ciudad Real",
    "Córdoba",
    "A Coruña",
    "Cuenca",
    "Girona",
    "Granada",
    "Guadalajara",
    "Gipuzkoa",
    "Huelva",
    "Huesca",
    "Jaén",
    "León",
    "Lleida",
    "La Rioja",
    "Lugo",
    "Madrid",
    "Málaga",
    "Murcia",
    "Nafarroa",
    "Ourense",
    "Asturias",
    "Palencia",
    "Las Palmas",
    "Pontevedra",
    "Salamanca",
    "Cantabria",
    "Segovia",
    "Sevilla",
    "Soria",
    "Tarragona",
    "Tenerife",
    "Teruel",
    "Toledo",
    "Valéncia",
    "Valladolid",
    "Bizkaia",
    "Zamora",
    "Zaragoza",
    "Ceuta",
    "Melilla",
  ]
}
