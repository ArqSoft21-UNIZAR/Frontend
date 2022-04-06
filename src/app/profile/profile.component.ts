import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileID: string | null = "";
  //Datos del profile
  name: string = "";
  surname: string = "";
  provincia: string = "";
  gender: string = "";
  age: number = 18;
  tagGood: Array<string> = [];
  tagBad: Array<string> = [];
  //Errores
  serviceError: boolean = false;
  serviceErrorMessage: string = "";

  constructor(public userService: UsersService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.profileID = this.route.snapshot.paramMap.get('id'); //Parametro de la url
    const body = { email: this.profileID };
    this.userService.get(body).subscribe(
      res => {
        // TODO(Marcos): Guardar informacion de vuelta
      },
      err => {
        this.serviceError = true
        this.serviceErrorMessage = err.message
      }
    );
    //Pruebas:
    this.userService.setToken("test")
    this.name = "Maria";
    this.surname = "Martinez Menorca";
    this.age = 21
    this.provincia = "Zaragoza";
    this.gender = "Mujer";
    this.tagGood[0] = "Futbol"
    this.tagBad[0] = "Basket"
  }

  validate() {
    return this.name == ""
    || this.surname == ""
    || this.tagBad.every((value) => value == "")
    || this.tagGood.every((value) => value == "")
    || this.gender == ""
    || this.provincia == ""
  }

  updateProfile() {
    const user = { 
      nombre: this.name,
      apellidos: this.surname,
      sexo: this.gender,
      edad: this.age,
      localidad: this.provincia,
      tagBuenos: this.tagGood,
      tagMalos: this.tagBad
     };
    console.log(user)
    this.userService.register(user).subscribe(
      res => {
        //TODO: Algo de feedback al usuario
      },
      err => {
        this.serviceError = true
        this.serviceErrorMessage = err.message
      }
    );
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
