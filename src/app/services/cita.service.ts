import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  constructor(private http: HttpClient) { }

  getDefault(): Observable<any> {
    return this.http.post("https://meetme-b.herokuapp.com/dates/getDefault",
                          { });
  }
}
