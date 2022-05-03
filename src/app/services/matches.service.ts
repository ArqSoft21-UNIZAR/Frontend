import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  constructor(private http: HttpClient) { }

  requestNew(email: string): Observable<any> {
    return this.http.post("https://meetme-b.herokuapp.com/matches/request",
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
                            orientacion: "",
                            capacidad: 2,
                          });
  }

  getMatches(email: string): Observable<any> {
    return this.http.post("https://meetme-b.herokuapp.com/matches/get",
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
                            orientacion: "",
                            capacidad: 2,
                          });
  }

  deleteMatch(email1: string, email2: string): Observable<any> {
    return this.http.post("https://meetme-b.herokuapp.com/matches/delete",
                          { 
                            email: email1,
                            email2: email2,
                          });
  }
}
