import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemperaturaBogotaService {

  private apiUrl: string = 'http://localhost:8080';
  constructor(private http: HttpClient) { }


  getAllUbicaciones():Observable<any>{
    const url = `${this.apiUrl}/all-ubicaciones`;
    return this.http.get<any>(url)
  }

}
