import {
  Ciudad,
  DatosVisuales,
  EnlaceVisual,
  Nodo,
  Persona
} from './nodo';

export class Grafo {
  private readonly nodos = new Map<string, Nodo>();

  private readonly adyacencias = new Map<string, Set<string>>();

  isEmpty(): boolean {
    return this.nodos.size === 0;
  }

  searchNode(id: string): Nodo | undefined {
    return this.nodos.get(id);
  }

  print(): Nodo[] {
    return [...this.nodos.values()];
  }

  printAdjacency(id: string): Nodo[] {
    const vecinos = this.adyacencias.get(id);

    if (!vecinos) {
      throw new Error('El nodo no existe.');
    }

    const resultado: Nodo[] = [];

    for (const vecinoId of vecinos) {
      const vecino = this.nodos.get(vecinoId);

      if (vecino) {
        resultado.push(vecino);
      }
    }

    return resultado;
  }

  addNode(nodo: Nodo): void {
    if (this.nodos.has(nodo.id)) {
      throw new Error('Ya existe un nodo con ese identificador.');
    }

    if (!nodo.nombre.trim()) {
      throw new Error('El nombre es obligatorio.');
    }

    if (nodo.tipo === 'persona') {
      if (!Number.isInteger(nodo.edad) || nodo.edad < 0) {
        throw new Error('La edad debe ser un entero mayor o igual a cero.');
      }

      const ciudad = this.nodos.get(nodo.ciudadId);

      if (!ciudad || ciudad.tipo !== 'ciudad') {
        throw new Error('Selecciona una ciudad existente.');
      }
    }

    const copia = {
      ...nodo,
      nombre: nodo.nombre.trim()
    } as Nodo;

    this.nodos.set(copia.id, copia);
    this.adyacencias.set(copia.id, new Set());

    if (copia.tipo === 'persona') {
      this.conectar(copia.id, copia.ciudadId);
    }
  }

  addEdge(personaAId: string, personaBId: string): void {
    const personaA = this.nodos.get(personaAId);
    const personaB = this.nodos.get(personaBId);

    if (
      !personaA ||
      !personaB ||
      personaA.tipo !== 'persona' ||
      personaB.tipo !== 'persona'
    ) {
      throw new Error('La amistad debe conectar dos personas.');
    }

    if (personaAId === personaBId) {
      throw new Error('Selecciona dos personas diferentes.');
    }

    if (this.adyacencias.get(personaAId)?.has(personaBId)) {
      throw new Error('Estas personas ya están conectadas.');
    }

    this.conectar(personaAId, personaBId);
  }

  removeNode(id: string): void {
    const nodo = this.nodos.get(id);

    if (!nodo) {
      throw new Error('El nodo no existe.');
    }

    if (
      nodo.tipo === 'ciudad' &&
      this.personasEnCiudad(id).length > 0
    ) {
      throw new Error(
        'No puedes eliminar una ciudad que tiene personas asociadas.'
      );
    }

    for (const vecinos of this.adyacencias.values()) {
      vecinos.delete(id);
    }

    this.adyacencias.delete(id);
    this.nodos.delete(id);
  }

  ciudades(): Ciudad[] {
    return this.print().filter(
      (nodo): nodo is Ciudad => nodo.tipo === 'ciudad'
    );
  }

  personas(): Persona[] {
    return this.print().filter(
      (nodo): nodo is Persona => nodo.tipo === 'persona'
    );
  }

  personasEnCiudad(ciudadId: string): Persona[] {
    const ciudad = this.nodos.get(ciudadId);

    if (!ciudad || ciudad.tipo !== 'ciudad') {
      throw new Error('La ciudad seleccionada no existe.');
    }

    return this.printAdjacency(ciudadId).filter(
      (nodo): nodo is Persona => nodo.tipo === 'persona'
    );
  }

  datosVisuales(): DatosVisuales {
    const nodes = this.print().map(nodo => ({
      id: nodo.id,
      label:
        nodo.tipo === 'persona'
          ? `${nodo.nombre} (${nodo.edad})`
          : nodo.nombre,
      color: nodo.tipo === 'ciudad' ? '#f59e0b' : '#2563eb',
      size: nodo.tipo === 'ciudad' ? 650 : 400
    }));

    const links: EnlaceVisual[] = [];
    const procesadas = new Set<string>();

    for (const [origenId, vecinos] of this.adyacencias) {
      for (const destinoId of vecinos) {
        const clave = JSON.stringify(
          [origenId, destinoId].sort()
        );

        if (procesadas.has(clave)) {
          continue;
        }

        procesadas.add(clave);

        const origen = this.nodos.get(origenId)!;
        const destino = this.nodos.get(destinoId)!;

        const esAmistad =
          origen.tipo === 'persona' &&
          destino.tipo === 'persona';

        links.push({
          source: origenId,
          target: destinoId,
          color: esAmistad ? '#10b981' : '#94a3b8'
        });
      }
    }

    return { nodes, links };
  }

  private conectar(origenId: string, destinoId: string): void {
    this.adyacencias.get(origenId)!.add(destinoId);
    this.adyacencias.get(destinoId)!.add(origenId);
  }
}