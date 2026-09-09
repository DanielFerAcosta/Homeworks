export class NodoCircularDoble<T> {
  dato: T;
  siguiente: NodoCircularDoble<T>;
  anterior: NodoCircularDoble<T>;

  constructor(dato: T) {
    this.dato = dato;
    this.siguiente = this;
    this.anterior = this;
  }
}

export class ListaCircularDoble<T> {
  actual: NodoCircularDoble<T> | null = null;

  insertar(dato: T): void {
    const nuevoNodo = new NodoCircularDoble(dato);

    if (this.actual === null) {
      this.actual = nuevoNodo;
      return;
    }

    const siguiente = this.actual.siguiente;

    nuevoNodo.anterior = this.actual;
    nuevoNodo.siguiente = siguiente;

    this.actual.siguiente = nuevoNodo;
    siguiente.anterior = nuevoNodo;
  }

  siguiente(): T | null {
    if (this.actual === null) {
      return null;
    }

    this.actual = this.actual.siguiente;

    return this.actual.dato;
  }

  anterior(): T | null {
    if (this.actual === null) {
      return null;
    }

    this.actual = this.actual.anterior;

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
      nodo = nodo.siguiente;
    } while (nodo !== this.actual);

    return datos;
  }
}