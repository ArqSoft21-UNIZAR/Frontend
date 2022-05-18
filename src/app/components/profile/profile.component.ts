import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loading: boolean = true;
  profileID: string | null = "";
  //Datos del profile
  name: string = "";
  surname: string = "";
  provincia: string = "";
  gender: string = "";
  age: number = 18;
  meGusta1: string = "";
  meGusta2: string = "";
  meGusta3: string = "";
  noMeGusta1: string = "";
  noMeGusta2: string = "";
  noMeGusta3: string = "";
  interes: string = "";
  pasta: string = "";
  //Errores
  serviceError: boolean = false;
  serviceErrorMessage: string = "";

  constructor(public userService: UsersService, public route: ActivatedRoute, public router: Router, public utilityService: UtilityService) { }

  ngOnInit(): void {
    this.profileID = this.route.snapshot.paramMap.get('id'); //Parametro de la url
    if (this.profileID !== null) {
      this.userService.get(this.profileID).subscribe({
        next: (v) => {
          console.log(v)
          this.name = v.nombre;
          this.surname = v.apellidos;
          this.age = Math.floor(-(Date.parse(v.fNacimiento)-Date.parse(Date()))/31557600000);
          this.gender = v.sexo;
          this.provincia = v.localidad;
          this.meGusta1 = v.meGusta1;
          this.meGusta2 = v.meGusta2;
          this.meGusta3 = v.meGusta3;
          this.noMeGusta1 = v.noMeGusta1;
          this.noMeGusta2 = v.noMeGusta2;
          this.noMeGusta3 = v.noMeGusta3;
          this.pasta = '$'.repeat(v.capacidad);
          this.interes = v.orientacion;
          this.loading = false;
        },
        error: (e) => {
          console.error(e);
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
    || this.meGusta1 == ""
    || this.noMeGusta1 == ""
    || this.gender == ""
    || this.provincia == ""
  }

  updateProfile() {
    this.loading = true;
    this.userService.edit(this.userService.getToken(), this.name, this.surname, this.gender, this.provincia, this.meGusta1, this.meGusta2, this.meGusta3, this.noMeGusta1, this.noMeGusta2, this.noMeGusta3, this.interes, this.pasta.length).subscribe({
      next: (v) => {
        console.log(v)
        this.loading = false;
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
