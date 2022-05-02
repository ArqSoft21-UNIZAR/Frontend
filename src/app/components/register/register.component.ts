import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { UtilityService } from 'src/app/services/utility.service';

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
  interes: string = "";
  pasta: string = "";
  fnacimiento: Date = new Date();
  tagGood: Array<string> = [];
  tagBad: Array<string> = [];

  
  //Error handling
  inputError: boolean = false;
  inputErrorMessage: string = "";
  serviceError: boolean = false;
  serviceErrorMessage: string = "";
  userError: boolean = false;

  constructor(public userService: UsersService, public router: Router, public utilityService: UtilityService) { }

  ngOnInit(): void {
  }

  register() {
    if(this.password.length < 6) {
      this.inputErrorMessage = "La contraseña debe tener al menos 6 caracteres.";
      this.inputError = true;
      return;
    }
    if(this.password != this.confirmPassword) {
      this.inputErrorMessage = "Las contraseñas no coinciden.";
      this.inputError = true;
      return;
    }
    this.inputError = false;
    
    this.loading = true;
    this.userService.register(this.email, this.password,this.name, this.surname, this.gender, this.fnacimiento, this.provincia, this.tagGood[0], this.tagGood[1], this.tagGood[2], this.tagBad[0], this.tagBad[1], this.tagBad[2], this.interes, this.pasta.length).subscribe({
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
    || this.interes == ""
  }

  formatLabel(value: number) {
    this.pasta = '$'.repeat(value);
    return '$'.repeat(value);
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
