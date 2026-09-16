import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Libro } from './models/libro';
import { PilaLibros } from './models/pila-libros';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {

  pila = new PilaLibros();

  nuevoLibro: Libro = {
    nombre: '',
    isbn: '',
    autor: '',
    editorial: ''
  };

  constructor() {
    this.cargarDatosMock();
  }

  // Datos de prueba
  cargarDatosMock(): void {

    this.pila.push({
      nombre: 'Cien años de soledad',
      isbn: '9780307474728',
      autor: 'Gabriel García Márquez',
      editorial: 'Editorial Sudamericana'
    });

    this.pila.push({
      nombre: 'Don Quijote de la Mancha',
      isbn: '9788420412146',
      autor: 'Miguel de Cervantes',
      editorial: 'Alfaguara'
    });

    this.pila.push({
      nombre: 'El principito',
      isbn: '9780156012195',
      autor: 'Antoine de Saint-Exupéry',
      editorial: 'Reynal & Hitchcock'
    });
  }

  // Agregar un nuevo libro
  agregarLibro(): void {

    if (
      this.nuevoLibro.nombre.trim() === '' ||
      this.nuevoLibro.isbn.trim() === '' ||
      this.nuevoLibro.autor.trim() === '' ||
      this.nuevoLibro.editorial.trim() === ''
    ) {
      alert('Por favor complete todos los campos.');
      return;
    }

    this.pila.push({
      nombre: this.nuevoLibro.nombre,
      isbn: this.nuevoLibro.isbn,
      autor: this.nuevoLibro.autor,
      editorial: this.nuevoLibro.editorial
    });

    // Limpiar formulario
    this.nuevoLibro = {
      nombre: '',
      isbn: '',
      autor: '',
      editorial: ''
    };
  }

  // Eliminar el último libro de la pila
  retirarLibro(): void {

    const libro = this.pila.pop();

    if (libro) {
      alert('Se retiró el libro: ' + libro.nombre);
    } else {
      alert('La pila está vacía.');
    }
  }

  obtenerLibros(): Libro[] {
    return this.pila.getLibros();
  }
}