import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ubicacionService } from '../../service/ubicacion.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-crear',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './crear.component.html',
  styleUrl: './crear.component.css'
})
export default class CrearComponent implements OnInit {

  ubicacionData: any = {
    nombre: '',
    latitud: 0,
    longitud: 0,
    temperatura_actual: 0
  }

  errorMessage : string = '';

  constructor( private ubicacionService: ubicacionService,
              private router:Router
  ){}

  ngOnInit(): void {
    
  }

  crearCoordenada(){
    //Validamos que los campos no esten vacios
    if(this.ubicacionData.nombre || this.ubicacionData.latitud || this.ubicacionData.longitud || this.ubicacionData.temperatura_actual){
      this.showError("Por favor llene todos los campos")
    }

    //funcion de de confirmar el registro o no
    const confirmRegistration = confirm('¿Estás seguro de que deseas registrar esta coordenada?');
    if (!confirmRegistration) {
      return;
    }

    this.ubicacionService.crearCoordenada(this.ubicacionData).subscribe(
      dato => {
        console.log(dato)
        this.router.navigate(['/tabla'])
      }
    )

  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; // Borrar el mensaje de error después del tiempo especificado
    }, 3000);
  }

}
