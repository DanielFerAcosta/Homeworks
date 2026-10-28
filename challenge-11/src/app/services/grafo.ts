import { Injectable, computed, signal } from '@angular/core';

import { Grafo } from '../models/grafo';

@Injectable({
  providedIn: 'root'
})
export class GrafoService {
  private readonly grafo = new Grafo();
  private readonly revision = signal(0);

  readonly ciudades = computed(() => {
    this.revision();
    return this.grafo.ciudades();
  });

  readonly personas = computed(() => {
    this.revision();
    return this.grafo.personas();
  });

  readonly visual = computed(() => {
    this.revision();
    return this.grafo.datosVisuales();
  });

  agregarCiudad(nombre: string): void {
    const limpio = nombre.trim();

    if (!limpio) {
      throw new Error('Escribe el nombre de la ciudad.');
    }

    const repetida = this.grafo.ciudades().some(
      ciudad =>
        ciudad.nombre.toLocaleLowerCase() ===
        limpio.toLocaleLowerCase()
    );

    if (repetida) {
      throw new Error('Esa ciudad ya está registrada.');
    }

    this.grafo.addNode({
      id: crypto.randomUUID(),
      tipo: 'ciudad',
      nombre: limpio
    });

    this.actualizar();
  }

  agregarPersona(
    nombre: string,
    edad: number,
    ciudadId: string
  ): void {
    this.grafo.addNode({
      id: crypto.randomUUID(),
      tipo: 'persona',
      nombre,
      edad,
      ciudadId
    });

    this.actualizar();
  }

  agregarAmistad(personaAId: string, personaBId: string): void {
    this.grafo.addEdge(personaAId, personaBId);
    this.actualizar();
  }

  eliminar(id: string): void {
    this.grafo.removeNode(id);
    this.actualizar();
  }

  habitantes(ciudadId: string) {
    this.revision();

    return ciudadId
      ? this.grafo.personasEnCiudad(ciudadId)
      : [];
  }

  nombreCiudad(id: string): string {
    return this.grafo.searchNode(id)?.nombre ?? 'Sin ciudad';
  }

  private actualizar(): void {
    this.revision.update(valor => valor + 1);
  }
}