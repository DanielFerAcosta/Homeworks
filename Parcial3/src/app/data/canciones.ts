import { Cancion } from '../models/cancion';

export const CANCIONES_INICIALES: Cancion[] = [
  { titulo: 'Blinding Lights', artista: 'The Weeknd', reproducciones: 1680 },
  { titulo: 'Despacito', artista: 'Luis Fonsi', reproducciones: 1520 },
  { titulo: 'Tacones Rojos', artista: 'Sebastián Yatra', reproducciones: 1450 },
  { titulo: 'Cómo Te Atreves', artista: 'Morat', reproducciones: 1448 },
  { titulo: 'Tusa', artista: 'Karol G', reproducciones: 1446 },
  { titulo: 'Por Fin Te Encontré', artista: 'Cali y El Dandee', reproducciones: 1444 },
  { titulo: 'Billie Jean', artista: 'Michael Jackson', reproducciones: 1390 },
  { titulo: 'Traicionera', artista: 'Sebastián Yatra', reproducciones: 1300 },
  { titulo: 'Tal Vez', artista: '3AM', reproducciones: 1250 },
  { titulo: 'Provenza', artista: 'Karol G', reproducciones: 1210 },
  { titulo: 'Besos en Guerra', artista: 'Morat', reproducciones: 1180 },
  { titulo: 'Pepas', artista: 'Farruko', reproducciones: 1150 },
  { titulo: 'Bad Guy', artista: 'Billie Eilish', reproducciones: 1120 },
  { titulo: 'Las Flores Que Eran Para Ti', artista: '3AM', reproducciones: 1080 },
  { titulo: 'Yo Te Esperaré', artista: 'Cali y El Dandee', reproducciones: 1040 },
  { titulo: 'Bichota', artista: 'Karol G', reproducciones: 980 },
  { titulo: 'Cuánto Me Duele', artista: 'Morat', reproducciones: 950 },
  { titulo: 'Robarte un Beso', artista: 'Carlos Vives y Sebastián Yatra', reproducciones: 920 },
  { titulo: 'Hawái', artista: 'Maluma', reproducciones: 870 },
  { titulo: 'Mil Maneras de Morir', artista: '3AM', reproducciones: 830 },
  { titulo: 'Shape of You', artista: 'Ed Sheeran', reproducciones: 790 },
  { titulo: 'La Bicicleta', artista: 'Carlos Vives', reproducciones: 760 },
  { titulo: 'Lento', artista: 'Cali y El Dandee', reproducciones: 720 },
];


export const RELACIONES_INICIALES: [string, string][] = [
 
  ['Despacito', 'Hawái'],
  ['Despacito', 'Pepas'],
  ['Despacito', 'La Bicicleta'],
  ['Tusa', 'Provenza'],
  ['Tusa', 'Bichota'],
  ['Tusa', 'Hawái'],
  ['Provenza', 'Bichota'],
  ['Pepas', 'Hawái'],


  ['La Bicicleta', 'Robarte un Beso'],
  ['Robarte un Beso', 'Traicionera'],
  ['Traicionera', 'Tacones Rojos'],
  ['Tacones Rojos', 'Por Fin Te Encontré'],
  ['Por Fin Te Encontré', 'Yo Te Esperaré'],
  ['Yo Te Esperaré', 'La Estrategia'],
  ['La Estrategia', 'Hawái'],


  ['Cómo Te Atreves', 'Besos en Guerra'],
  ['Besos en Guerra', 'Se Que Te Duele'],
  ['Se Que Te Duele', 'Traicionera'],


  ['Tal Vez', 'Las Flores Que Eran Para Ti'],
  ['Tal Vez', 'Mil Maneras de Morir'],
  ['Tal Vez', 'Yo Te Esperaré'],
  ['Las Flores Que Eran Para Ti', 'Se Que Te Duele'],

  
  ['Blinding Lights', 'Bad Guy'],
  ['Blinding Lights', 'Shape of You'],
  ['Blinding Lights', 'Billie Jean'],
  ['Shape of You', 'Tacones Rojos'],
];