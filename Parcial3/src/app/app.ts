import { Component, inject } from '@angular/core';
import { MusicaService } from './services/musica.service';
import { Buscador } from './components/buscador/buscador';
import { AgregarCancion } from './components/agregar-cancion/agregar-cancion';
import { Ranking } from './components/ranking/ranking';
import { Recomendaciones } from './components/recomendaciones/recomendaciones';

@Component({
  selector: 'app-root',
  imports: [Buscador, AgregarCancion, Ranking, Recomendaciones],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly musica = inject(MusicaService);
}