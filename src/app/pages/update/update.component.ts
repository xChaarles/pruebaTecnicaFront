import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ubicacionService } from '../../service/ubicacion.service';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export default class UpdateComponent implements OnInit {

  ubicacionData: any = {};
  errorMessage: string = '';

  constructor(private ubicacionService: ubicacionService,
              private router:Router,
              private route: ActivatedRoute){}

  ngOnInit(): void {
    this.getCoordenadaById()
  }

  getCoordenadaById(){
    const id: any = this.route.snapshot.paramMap.get('id')
    this.ubicacionService.getUbicacionById(id).subscribe(
      dato => {
        let ubicacionData = dato;
        const { nombre, latitud, longitud, temperatura_actual } = ubicacionData.ubicacion;
        console.log(ubicacionData)
        this.ubicacionData = { nombre, latitud, longitud, temperatura_actual };
      }
    )
  }

  updateCoordenada(){
    const id: any = this.route.snapshot.paramMap.get('id')

    //Validamos que los campos no esten vacios
    if(this.ubicacionData.nombre || this.ubicacionData.latitud || this.ubicacionData.longitud || this.ubicacionData.temperatura_actual){
      this.showError("Por favor llene todos los campos")
    }

    const confirmRegistration = confirm('¿Estás seguro de que deseas Actualizar esta coordenada?');
    if (!confirmRegistration) {
      return;
    }

    this.ubicacionService.updateCoordenada(this.ubicacionData, id).subscribe(
      dato => {
        console.log(dato)
        this.router.navigate(['/tabla'])
      }
    )
  }

  showError(mess: string) {
    this.errorMessage = mess;
    setTimeout(() => {
      this.errorMessage = ''
    }, 3000)
  }

}
