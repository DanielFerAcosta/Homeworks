export class NodoCircular<T> {
  dato: T;
  siguiente: NodoCircular<T> | null = null;

  constructor(dato: T) {
    this.dato = dato;
  }
}

export class ListaCircular<T> {
  actual: NodoCircular<T> | null = null;

  insertar(dato: T): void {
    const nuevoNodo = new NodoCircular(dato);

    if (this.actual === null) {
      this.actual = nuevoNodo;
      nuevoNodo.siguiente = nuevoNodo;
      return;
    }

    let ultimo = this.actual;

    while (
      ultimo.siguiente !== null &&
      ultimo.siguiente !== this.actual
    ) {
      ultimo = ultimo.siguiente;
    }

    nuevoNodo.siguiente = this.actual;
    ultimo.siguiente = nuevoNodo;
  }

  siguiente(): T | null {
    if (this.actual === null) {
      return null;
    }

    this.actual = this.actual.siguiente;

    if (this.actual === null) {
      return null;
    }

    return this.actual.dato;
  }

  obtenerTodos(): T[] {
    const datos: T[] = [];

    if (this.actual === null) {
      return datos;
    }

    let nodo = this.actual;

    do {
      datos.push(nodo.dato);

      if (nodo.siguiente === null) {
        break;
      }

      nodo = nodo.siguiente;

    } while (nodo !== this.actual);

    return datos;
  }

  obtenerActual(): T | null {
    return this.actual?.dato ?? null;
  }
}