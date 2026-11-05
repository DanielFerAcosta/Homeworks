import {
  Component,
  computed,
  inject,
  signal
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import { BuscadorService } from './services/buscador';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  readonly buscador = inject(BuscadorService);

  readonly prefijo = signal('air');
  readonly limite = signal<number | null>(2);

  readonly error = signal('');
  readonly mensaje = signal('');

  nombreProducto = '';
  popularidadProducto: number | null = null;

  readonly kValido = computed(() => {
    const k = this.limite();

    return (
      k !== null &&
      Number.isInteger(k) &&
      k > 0
    );
  });

  readonly coincidencias = computed(() =>
    this.buscador.buscarPorPrefijo(this.prefijo())
  );

  readonly resultados = computed(() => {
    if (!this.kValido()) {
      return [];
    }

    return this.buscador.buscarTopK(
      this.prefijo(),
      this.limite()!
    );
  });

  agregarProducto(): void {
    this.error.set('');
    this.mensaje.set('');

    try {
      if (this.popularidadProducto === null) {
        throw new Error('Escribe la popularidad del producto.');
      }

      this.buscador.insertar(
        this.nombreProducto,
        this.popularidadProducto
      );

      this.nombreProducto = '';
      this.popularidadProducto = null;

      this.mensaje.set(
        'Producto guardado. Si el nombre ya existía, ' +
        'se actualizó su popularidad.'
      );
    } catch (error: unknown) {
      this.error.set(
        error instanceof Error
          ? error.message
          : 'No se pudo guardar el producto.'
      );
    }
  }

  cargarEjemplo(): void {
    this.prefijo.set('air');
    this.limite.set(2);
  }
}