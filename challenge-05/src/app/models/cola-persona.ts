import { Persona } from './persona';

export class ColaPersonas {

  private personas: Persona[] = [];

  // Agregar una persona a la cola
  enqueue(persona: Persona): void {
    this.personas.push(persona);
  }

  // Sacar la primera persona de la cola
  dequeue(): Persona | undefined {
    return this.personas.shift();
  }

  // Obtener todas las personas
  getPersonas(): Persona[] {
    return this.personas;
  }

  // Saber cuántas personas hay
  size(): number {
    return this.personas.length;
  }
}