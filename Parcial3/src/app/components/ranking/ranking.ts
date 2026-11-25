import { Component, computed, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MusicaService } from '../../services/musica.service';

@Component({
  selector: 'app-ranking',
  imports: [DecimalPipe],
  templateUrl: './ranking.html',
  styleUrl: './ranking.scss',
})
export class Ranking {
  protected readonly musica = inject(MusicaService);

  // Reproducciones de la raíz del heap (la más escuchada)
  private readonly maximo = computed(() => this.musica.ranking()[0]?.reproducciones || 1);

  porcentaje(reproducciones: number): number {
    return Math.round((reproducciones / this.maximo()) * 100);
  }
}