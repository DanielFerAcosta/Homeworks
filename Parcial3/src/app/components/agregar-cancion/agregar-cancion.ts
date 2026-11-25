import { Component, inject, signal } from '@angular/core';
import { MusicaService } from '../../services/musica.service';

@Component({
  selector: 'app-agregar-cancion',
  templateUrl: './agregar-cancion.html',
  styleUrl: './agregar-cancion.scss',
})
export class AgregarCancion {
  protected readonly musica = inject(MusicaService);

  readonly titulo = signal('');
  readonly artista = signal('');
  readonly reproducciones = signal(0);
  readonly relacionada = signal('');
  readonly mensaje = signal<{ ok: boolean; texto: string } | null>(null);

  texto(evento: Event): string {
    return (evento.target as HTMLInputElement | HTMLSelectElement).value;
  }

  numero(evento: Event): number {
    return Number(this.texto(evento)) || 0;
  }

  guardar(evento: Event): void {
    evento.preventDefault();

    const respuesta = this.musica.agregar(
      {
        titulo: this.titulo(),
        artista: this.artista().trim() || 'Desconocido',
        reproducciones: Math.max(0, this.reproducciones()),
      },
      this.relacionada() || null,
    );
    this.mensaje.set(respuesta);

    if (respuesta.ok) {
      this.titulo.set('');
      this.artista.set('');
      this.reproducciones.set(0);
      this.relacionada.set('');
    }
  }
}