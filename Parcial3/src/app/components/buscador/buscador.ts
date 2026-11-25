import { Component, computed, inject, signal } from '@angular/core';
import { MusicaService } from '../../services/musica.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.html',
  styleUrl: './buscador.scss',
})
export class Buscador {
  private readonly musica = inject(MusicaService);

  readonly consulta = signal('');
  readonly resultado = signal<'existe' | 'no-existe' | null>(null);
  readonly sugerencias = computed(() => this.musica.sugerencias(this.consulta()));
  readonly largoPrefijo = computed(() => this.consulta().trim().length);

  alEscribir(evento: Event): void {
    this.consulta.set((evento.target as HTMLInputElement).value);
    this.resultado.set(null);
  }

  buscar(): void {
    const titulo = this.consulta().trim();
    if (!titulo) return;
    const existe = this.musica.existe(titulo);
    this.resultado.set(existe ? 'existe' : 'no-existe');
    if (existe) this.musica.seleccionar(titulo);
  }

  elegir(titulo: string): void {
    this.consulta.set(titulo);
    this.resultado.set('existe');
    this.musica.seleccionar(titulo);
  }
}