import {
  Component,
  computed,
  inject,
  signal
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import { GrafoService } from './services/grafo';

import {
  VistaGrafo
} from './components/vista-grafo/vista-grafo';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, VistaGrafo],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  readonly servicio = inject(GrafoService);

  nombreCiudad = '';

  nombrePersona = '';
  edadPersona: number | null = null;
  ciudadPersona = '';

  amigoA = '';
  amigoB = '';

  readonly ciudadConsulta = signal('');

  readonly error = signal('');
  readonly mensaje = signal('');

  readonly habitantes = computed(
    () => this.servicio.habitantes(this.ciudadConsulta())
  );

  crearCiudad(): void {
    this.ejecutar(() => {
      this.servicio.agregarCiudad(this.nombreCiudad);
      this.nombreCiudad = '';
    }, 'Ciudad creada.');
  }

  crearPersona(): void {
    this.ejecutar(() => {
      if (this.edadPersona === null) {
        throw new Error('Escribe la edad de la persona.');
      }

      this.servicio.agregarPersona(
        this.nombrePersona,
        this.edadPersona,
        this.ciudadPersona
      );

      this.nombrePersona = '';
      this.edadPersona = null;
    }, 'Persona creada y conectada con su ciudad.');
  }

  crearAmistad(): void {
    this.ejecutar(() => {
      this.servicio.agregarAmistad(
        this.amigoA,
        this.amigoB
      );

      this.amigoA = '';
      this.amigoB = '';
    }, 'Amistad creada.');
  }

  eliminar(id: string, nombre: string): void {
    if (!window.confirm(`¿Eliminar "${nombre}" del grafo?`)) {
      return;
    }

    this.ejecutar(() => {
      this.servicio.eliminar(id);

      if (this.ciudadConsulta() === id) {
        this.ciudadConsulta.set('');
      }

      if (this.ciudadPersona === id) {
        this.ciudadPersona = '';
      }

      if (this.amigoA === id) {
        this.amigoA = '';
      }

      if (this.amigoB === id) {
        this.amigoB = '';
      }
    }, 'Nodo eliminado.');
  }

  private ejecutar(
    accion: () => void,
    mensaje: string
  ): void {
    this.error.set('');
    this.mensaje.set('');

    try {
      accion();
      this.mensaje.set(mensaje);
    } catch (error: unknown) {
      this.error.set(
        error instanceof Error
          ? error.message
          : 'No se pudo realizar la operación.'
      );
    }
  }
}