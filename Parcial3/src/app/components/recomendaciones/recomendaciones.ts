import { Component, computed, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MusicaService } from '../../services/musica.service';

@Component({
  selector: 'app-recomendaciones',
  imports: [DecimalPipe],
  templateUrl: './recomendaciones.html',
  styleUrl: './recomendaciones.scss',
})
export class Recomendaciones {
  protected readonly musica = inject(MusicaService);

  readonly actual = computed(() => {
    const titulo = this.musica.seleccionada();
    const cancion = titulo ? this.musica.obtener(titulo) : undefined;
    return cancion ? { ...cancion } : null;
  });

  readonly directas = computed(() => this.musica.recomendaciones().filter((r) => r.nivel === 1));
  readonly indirectas = computed(() => this.musica.recomendaciones().filter((r) => r.nivel === 2));
}