import { Cancion } from '../models/cancion';

export const CANCIONES_INICIALES: Cancion[] = [
  { titulo: 'Blinding Lights', artista: 'The Weeknd', reproducciones: 1680 },
  { titulo: 'Despacito', artista: 'Luis Fonsi', reproducciones: 1520 },
  { titulo: 'Billie Jean', artista: 'Michael Jackson', reproducciones: 1450 },
  { titulo: 'Bohemian Rhapsody', artista: 'Queen', reproducciones: 1448 },
  { titulo: 'Tusa', artista: 'Karol G', reproducciones: 1446 },
  { titulo: 'Shape of You', artista: 'Ed Sheeran', reproducciones: 1444 },
  { titulo: 'Provenza', artista: 'Karol G', reproducciones: 1210 },
  { titulo: 'Pepas', artista: 'Farruko', reproducciones: 1205 },
  { titulo: 'Bad Guy', artista: 'Billie Eilish', reproducciones: 1120 },
  { titulo: 'Hello', artista: 'Adele', reproducciones: 1050 },
  { titulo: 'Beat It', artista: 'Michael Jackson', reproducciones: 990 },
  { titulo: 'Bichota', artista: 'Karol G', reproducciones: 980 },
  { titulo: 'Someone Like You', artista: 'Adele', reproducciones: 940 },
  { titulo: 'Hawái', artista: 'Maluma', reproducciones: 870 },
  { titulo: 'La Bicicleta', artista: 'Carlos Vives', reproducciones: 760 },
];

// Aristas del grafo no dirigido: [cancionA, cancionB]
export const RELACIONES_INICIALES: [string, string][] = [
  ['Despacito', 'Hawái'],
  ['Despacito', 'Pepas'],
  ['Despacito', 'La Bicicleta'],
  ['Tusa', 'Provenza'],
  ['Tusa', 'Bichota'],
  ['Tusa', 'Hawái'],
  ['Provenza', 'Bichota'],
  ['Pepas', 'Hawái'],
  ['Blinding Lights', 'Bad Guy'],
  ['Blinding Lights', 'Shape of You'],
  ['Blinding Lights', 'Billie Jean'],
  ['Billie Jean', 'Beat It'],
  ['Bohemian Rhapsody', 'Beat It'],
  ['Someone Like You', 'Hello'],
  ['Hello', 'Shape of You'],
];