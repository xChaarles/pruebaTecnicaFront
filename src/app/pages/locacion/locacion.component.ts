import { Component, OnInit, signal, viewChild, viewChildren} from '@angular/core';
import { TemperaturaBogotaService } from '../../service/temperatura-bogota.service';
import { GoogleMap, MapAdvancedMarker, MapInfoWindow } from '@angular/google-maps';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-locacion',
  standalone: true,
  imports: [GoogleMap, FormsModule, MapAdvancedMarker, MapInfoWindow],
  templateUrl: './locacion.component.html',
  styleUrl: './locacion.component.css'
})
export default class LocacionComponent implements OnInit {
  infoWindowRef = viewChild.required(MapInfoWindow);
  markersRef = viewChildren(MapAdvancedMarker)

  constructor(private temperaturaService: TemperaturaBogotaService){}

  ubicacion: any  [] = [];
  center: google.maps.LatLngLiteral = {lat: 4.60971, lng: -74.08175};
  zoom = signal(11);

  ngOnInit(): void {
    this.getAllUbicaciones();
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

  getAllUbicaciones(){
    this.temperaturaService.getAllUbicaciones().subscribe(
      dato => {
        this.ubicacion = dato.ubicacionList;
        console.log(this.ubicacion)
      }
    )
  }
}
