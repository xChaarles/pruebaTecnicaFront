import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ubicacionService {

  private apiUrl: string = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  getAllUbicacionesPage(page: number, size: number):Observable<any>{
    const url = `${this.apiUrl}/all-ubicacionesPage?page=${page}&size=${size}`;
    return this.http.get<any>(url)
  }

  getAllUbicaciones():Observable<any>{
    const url = `${this.apiUrl}/all-ubicaciones`;
    return this.http.get<any>(url)
  }

  crearCoordenada(ubicacionData:any):Observable<any>{
    const url = `${this.apiUrl}/crear-ubicacion`;
    return this.http.post<any>(url, ubicacionData);
  }

  deeleteCoordenada(id:string):Observable<any>{
    const url = `${this.apiUrl}/delete-ubicacion/${id}`;
    return this.http.delete(url)
  }

}
