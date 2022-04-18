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
                          {email: email, password: password});
  }

  register(email:string, password:string, name:string, surname:string, gender:string, age:number, provincia:string, meGusta1:string, meGusta2:string, meGusta3:string, noMeGusta1:string, noMeGusta2:string, noMeGusta3:string): Observable<any> {
    return this.http.post("https://meetme-b.herokuapp.com/users/register",
                          {
                            email: email,
                            password: password, 
                            nombre: name,
                            apellidos: surname,
                            sexo: gender,
                            edad: age,
                            localidad: provincia,
                            meGusta1: meGusta1,
                            meGusta2: meGusta2,
                            meGusta3: meGusta3,
                            noMeGusta1: noMeGusta1,
                            noMeGusta2: noMeGusta2,
                            noMeGusta3: noMeGusta3,
                          });
  }

  get(email:string): Observable<any> {
    return this.http.post("https://meetme-b.herokuapp.com/users/get",
                          {email: email});
  }

  edit(email:string, name:string, surname:string, gender:string, age:number, provincia:string, meGusta1:string, meGusta2:string, meGusta3:string, noMeGusta1:string, noMeGusta2:string, noMeGusta3:string): Observable<any> {
    return this.http.post("https://meetme-b.herokuapp.com/users/edit",
                          {
                            email: email,
                            nombre: name,
                            apellidos: surname,
                            sexo: gender,
                            edad: age,
                            localidad: provincia,
                            meGusta1: meGusta1,
                            meGusta2: meGusta2,
                            meGusta3: meGusta3,
                            noMeGusta1: noMeGusta1,
                            noMeGusta2: noMeGusta2,
                            noMeGusta3: noMeGusta3,
                          });
  }

  // Cookies
  setToken(token: string) {
    this.cookies.set("tokenMeetMe", token);
  }

  getToken() {
    return this.cookies.get("tokenMeetMe");
  }
}
