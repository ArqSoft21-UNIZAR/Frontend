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
    
    return this.http.post("https://localhost:7022/users/login",
                          {email: email, password: password},
                          {responseType: 'text'}); //Esto es temporal
  }

  register(email:string, password:string, name:string, surname:string, gender:string, age:number, provincia:string, tagGood:string[], tagBad:string[]): Observable<any> {
    return this.http.post("<DIRECCION WEB API>", //TODO
                          {
                            email: email, 
                            password: password, 
                            nombre: name,
                            apellidos: surname,
                            sexo: gender,
                            edad: age,
                            localidad: provincia,
                            tagBuenos: tagGood.map(str => str.toLowerCase()),
                            tagMalos: tagBad.map(str => str.toLowerCase())
                          },
                          {responseType: 'text'}); //Esto es temporal
  }

  get(email:string): Observable<any> {
    return this.http.post("<DIRECCION WEB API>", //TODO
                          {email: email},
                          {responseType: 'text'}); //Esto es temporal
  }

  edit(name:string, surname:string, gender:string, age:number, provincia:string, tagGood:string[], tagBad:string[]): Observable<any> {
    return this.http.post("<DIRECCION WEB API>", //TODO
                          {
                            nombre: name,
                            apellidos: surname,
                            sexo: gender,
                            edad: age,
                            localidad: provincia,
                            tagBuenos: tagGood.map(str => str.toLowerCase()),
                            tagMalos: tagBad.map(str => str.toLowerCase())
                          },
                          {responseType: 'text'}); //Esto es temporal
  }

  // Cookies
  setToken(token: string) {
    this.cookies.set("tokenMeetMe", token);
  }

  getToken() {
    return this.cookies.get("tokenMeetMe");
  }
}
