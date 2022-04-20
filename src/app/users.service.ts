import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private cookies: CookieService) {}

  login(email:string, password:string): Observable<any> {
    return this.http.post("https://meetme-b.herokuapp.com/users/login",
                          { email: email,
                            password: password,
                            apellidos: "",
                            localidad: "",
                            sexo: "",
                            nombre: "",
                            meGusta1: "",
                            meGusta2: "",
                            meGusta3: "",
                            noMeGusta1: "",
                            noMeGusta2: "",
                            noMeGusta3: "",
                          });
  }

  register(email:string, password:string, name:string, surname:string, gender:string, age:Date, provincia:string, meGusta1:string, meGusta2:string, meGusta3:string, noMeGusta1:string, noMeGusta2:string, noMeGusta3:string): Observable<any> {
    console.log({
      email: email,
      password: password, 
      nombre: name,
      apellidos: surname,
      sexo: gender,
      fNacimiento: age,
      localidad: provincia,
      meGusta1: meGusta1,
      meGusta2: (meGusta2 != undefined ? meGusta2 :""),
      meGusta3: (meGusta3 != undefined ? meGusta3 :""),
      noMeGusta1: noMeGusta1,
      noMeGusta2: (noMeGusta2 != undefined ? noMeGusta2 :""),
      noMeGusta3: (noMeGusta3 != undefined ? noMeGusta3 :""),
    })
    return this.http.post("https://meetme-b.herokuapp.com/users/register",
                          {
                            email: email,
                            password: password, 
                            nombre: name,
                            apellidos: surname,
                            sexo: gender,
                            fNacimiento: age,
                            localidad: provincia,
                            meGusta1: meGusta1,
                            meGusta2: (meGusta2 != undefined ? meGusta2 :""),
                            meGusta3: (meGusta3 != undefined ? meGusta3 :""),
                            noMeGusta1: noMeGusta1,
                            noMeGusta2: (noMeGusta2 != undefined ? noMeGusta2 :""),
                            noMeGusta3: (noMeGusta3 != undefined ? noMeGusta3 :""),
                          });
  }

  get(email:string): Observable<any> {
    return this.http.post("https://meetme-b.herokuapp.com/users/get",
                          { email: email,
                            apellidos: "",
                            localidad: "",
                            sexo: "",
                            nombre: "",
                            password: "",
                            meGusta1: "",
                            meGusta2: "",
                            meGusta3: "",
                            noMeGusta1: "",
                            noMeGusta2: "",
                            noMeGusta3: "",
                          });
  }

  edit(email:string, name:string, surname:string, gender:string, provincia:string, meGusta1:string, meGusta2:string, meGusta3:string, noMeGusta1:string, noMeGusta2:string, noMeGusta3:string): Observable<any> {
    console.log( {
      email: email,
      nombre: name,
      apellidos: surname,
      sexo: gender,
      localidad: provincia,
      meGusta1: meGusta1,
      meGusta2: (meGusta2 != undefined ? meGusta2 : ""),
      meGusta3: (meGusta3 != undefined ? meGusta3 : ""),
      noMeGusta1: noMeGusta1,
      noMeGusta2: (noMeGusta2 != undefined ? noMeGusta2 : ""),
      noMeGusta3: (noMeGusta3 != undefined ? noMeGusta3 : ""),
    });
    return this.http.post("https://meetme-b.herokuapp.com/users/edit",
                          {
                            email: email,
                            password: "",
                            nombre: name,
                            apellidos: surname,
                            sexo: gender,
                            localidad: provincia,
                            meGusta1: meGusta1,
                            meGusta2: (meGusta2 != undefined ? meGusta2 : ""),
                            meGusta3: (meGusta3 != undefined ? meGusta3 : ""),
                            noMeGusta1: noMeGusta1,
                            noMeGusta2: (noMeGusta2 != undefined ? noMeGusta2 : ""),
                            noMeGusta3: (noMeGusta3 != undefined ? noMeGusta3 : ""),
                          });
  }

  // Cookies
  setToken(token: string) {
    this.cookies.set("tokenMeetMe", token);
  }

  getToken() {
    return this.cookies.get("tokenMeetMe");
  }

  deleteToken() {
    this.cookies.delete("tokenMeetMe");
  }
}
