export interface Ciudad {
  id: string;
  tipo: 'ciudad';
  nombre: string;
}

export interface Persona {
  id: string;
  tipo: 'persona';
  nombre: string;
  edad: number;
  ciudadId: string;
}

export type Nodo = Ciudad | Persona;

export interface NodoVisual {
  id: string;
  label: string;
  color: string;
  size: number;
}

export interface EnlaceVisual {
  source: string;
  target: string;
  color: string;
}

export interface DatosVisuales {
  nodes: NodoVisual[];
  links: EnlaceVisual[];
}