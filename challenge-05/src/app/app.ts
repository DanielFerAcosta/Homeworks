import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Persona } from './models/persona';
import { ColaPersonas } from './models/cola-personas';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {

  cola = new ColaPersonas();

  nuevaPersona: Persona = {
    nombre: '',
    montoRetiro: 0,
    fechaLlegada: ''
  };

  constructor() {
    this.cargarDatosMock();
  }

  // Generar una fecha de llegada aleatoria
  generarFechaAleatoria(): string {

    const ahora = new Date();

    // Genera una fecha entre 1 y 60 minutos antes
    const minutosAleatorios = Math.floor(Math.random() * 60);

    const fecha = new Date(
      ahora.getTime() - minutosAleatorios * 60000
    );

    return fecha.toLocaleTimeString('es-CO', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  // Cargar personas de prueba
  cargarDatosMock(): void {

    this.cola.enqueue({
      nombre: 'Carlos Pérez',
      montoRetiro: 200000,
      fechaLlegada: this.generarFechaAleatoria()
    });

    this.cola.enqueue({
      nombre: 'Laura Gómez',
      montoRetiro: 350000,
      fechaLlegada: this.generarFechaAleatoria()
    });

    this.cola.enqueue({
      nombre: 'Andrés Rodríguez',
      montoRetiro: 150000,
      fechaLlegada: this.generarFechaAleatoria()
    });

    this.cola.enqueue({
      nombre: 'María González',
      montoRetiro: 500000,
      fechaLlegada: this.generarFechaAleatoria()
    });
  }

  // Agregar una persona nueva
  agregarPersona(): void {

    if (
      this.nuevaPersona.nombre.trim() === '' ||
      this.nuevaPersona.montoRetiro <= 0
    ) {
      alert('Por favor complete todos los campos.');
      return;
    }

    const persona: Persona = {
      nombre: this.nuevaPersona.nombre,
      montoRetiro: this.nuevaPersona.montoRetiro,
      fechaLlegada: this.generarFechaAleatoria()
    };

    this.cola.enqueue(persona);

    // Limpiar formulario
    this.nuevaPersona = {
      nombre: '',
      montoRetiro: 0,
      fechaLlegada: ''
    };
  }

  // Atender a la primera persona
  atenderPersona(): void {

    const persona = this.cola.dequeue();

    if (persona) {
      alert(
        'Persona atendida: ' +
        persona.nombre +
        '\nMonto retirado: $' +
        persona.montoRetiro
      );
    } else {
      alert('La cola está vacía.');
    }
  }

  obtenerPersonas(): Persona[] {
    return this.cola.getPersonas();
  }
}