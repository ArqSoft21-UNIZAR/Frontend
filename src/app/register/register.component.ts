import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //Form
  email: string = "";
  name: string = "";
  surname: string = "";
  password: string = "";
  confirmPassword: string = "";
  provincia: string = "";
  gender: string = "";
  age: number = 18;
  tagGood: Array<string> = [];
  tagBad: Array<string> = [];

  
  //Error handling
  passwordError: boolean = false;
  serviceError: boolean = false;
  serviceErrorMessage: string = "";
  userError: boolean = false;

  constructor(public userService: UsersService, public router: Router) { }

  ngOnInit(): void {
  }

  register() {
    if(this.password != this.confirmPassword) {
      this.passwordError = true;
      return;
    }
    this.passwordError = false;
    const user = { email: this.email, 
                   password: this.password, 
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
        // TODO(Marcos): Guardar con setToken algo de res para recordar que el login es correcto. Hacer set tambien de userError
        // this.userService.setToken(res.algo);
        // NOTE(Marcos): Para borrar la cookie (hacer logout): this.cookies.delete("token");
        this.router.navigateByUrl('/');
      },
      err => {
        this.serviceError = true
        this.serviceErrorMessage = err.message
      }
    );
  }

  validate() {
    return this.email == ""
    || this.password == ""
    || this.confirmPassword == ""
    || this.name == ""
    || this.surname == ""
    || this.tagBad.every((value) => value == "")
    || this.tagGood.every((value) => value == "")
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
