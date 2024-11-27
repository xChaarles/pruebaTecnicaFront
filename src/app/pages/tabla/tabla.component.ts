import { Component, OnInit } from '@angular/core';
import { ubicacionService } from '../../service/ubicacion.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.css'
})
export default class TablaComponent implements OnInit {

  ubicacion: any [] = [];
  currentPage: number = 1;
  pageSize: number = 10;  
  totalPages: number = 0;

  constructor(private ubicacionService: ubicacionService){}

  ngOnInit(): void {
    this.getAllUbicacion()
  }

  getAllUbicacion(){
    this.ubicacionService.getAllUbicacionesPage(this.currentPage, this.pageSize).subscribe(
      dato => {
        this.ubicacion = dato.ubicacionList;
        this.totalPages = Math.ceil(dato.totalCount / this.pageSize);
      },
      (error) => {
        console.error('Error al obtener las ubicaciones', error);
      }
    )
  }
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getAllUbicacion();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getAllUbicacion();
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.getAllUbicacion();    // Cargar los datos de la nueva página
  }

  deleteUbicacion(id: string){

  }

}
