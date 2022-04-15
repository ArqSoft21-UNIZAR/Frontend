import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { UtilityService } from '../utility.service';

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

  constructor(public userService: UsersService, public route: ActivatedRoute, public router: Router, public utilityService: UtilityService) { }

  ngOnInit(): void {
    this.profileID = this.route.snapshot.paramMap.get('id'); //Parametro de la url
    console.log(this.userService.getToken()," ", this.profileID)
    if (this.profileID !== null) {
      this.userService.get(this.profileID).subscribe({
        next: (v) => {
          console.log(v);
          this.name = v.nombre;
          this.surname = v.apellidos;
          this.age = v.edad;
          this.gender = v.sexo;
          this.provincia = v.localidad;
          this.tagGood = new Array<string>(v.meGusta1, v.meGusta2, v.meGusta3)
          this.tagBad = new Array<string>(v.noMeGusta1, v.noMeGusta2, v.noMeGusta3)
        },
        error: (e) => {
          this.router.navigateByUrl('/404');
        }
      });
    }
    else {
      this.router.navigateByUrl("/404")
    }
  }

  validate() {
    return this.name == ""
    || this.surname == ""
    || this.tagBad[0] == undefined
    || this.tagGood[0] == undefined
    || this.gender == ""
    || this.provincia == ""
  }

  updateProfile() {
    this.userService.edit(this.userService.getToken(),this.name, this.surname, this.gender, this.age, this.provincia, this.tagGood, this.tagBad).subscribe({
      next: (v) => {
        this.utilityService.goHome();
      },
      error: (e) => {
        console.error(e)
        this.serviceError = true
        this.serviceErrorMessage = e.message
      }
    });
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
