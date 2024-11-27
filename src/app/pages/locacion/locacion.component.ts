import { Component, OnInit, signal, viewChild, viewChildren} from '@angular/core';
import {  ubicacionService } from '../../service/ubicacion.service';
import { GoogleMap, MapAdvancedMarker, MapInfoWindow } from '@angular/google-maps';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-locacion',
  standalone: true,
  imports: [GoogleMap, FormsModule, MapAdvancedMarker, MapInfoWindow, RouterModule],
  templateUrl: './locacion.component.html',
  styleUrl: './locacion.component.css'
})
export default class LocacionComponent implements OnInit {

  infoWindowRef = viewChild.required(MapInfoWindow);
  markersRef = viewChildren(MapAdvancedMarker)

  constructor(private ubicacionService: ubicacionService){}

  ubicacion: any  [] = [];
  center: google.maps.LatLngLiteral = {lat: 4.60971, lng: -74.08175};
  zoom = signal(11);
  currentLocation: google.maps.LatLngLiteral | null = null;
  infoContent = '';

  ngOnInit(): void {
    this.getAllUbicaciones();
    this.getCurretLocation();
  }

  openInfoWindow(locacion: any, marker:MapAdvancedMarker){
    const contenido = `
    <h3 class="font-bold text-xl">${locacion.nombre}</h3>
    <p>${locacion.temperatura_actual}°C</p>
    `
    this.infoWindowRef().open(marker, false, contenido)
  }

  irUbicacion(locacion: any, posicion:number){
    const markers = this.markersRef();
    const markerfRef = markers[posicion];

    this.openInfoWindow(locacion, markerfRef)
  }

  getCurretLocation() {
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.currentLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
          };
          this.center = this.currentLocation;
        },
        (error) => {
          console.error('Error al obtener la ubicación', error);
        }
      );
    } else {
      console.error('La geolocalización no está soportada por este navegador.');
    }
  }

  openMyLocationWindow(marker: MapAdvancedMarker) {
    const contenido = `<h3 class="font-bold text-xl">Mi ubicación</h3>`;
    this.infoWindowRef().open( marker,false, contenido);
  }

  getAllUbicaciones(){
    this.ubicacionService.getAllUbicaciones().subscribe(
      dato => {
        this.ubicacion = dato.ubicacionList;
      }
    )
  }
}
