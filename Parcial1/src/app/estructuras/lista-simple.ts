export class NodoSimple<T> {
  dato: T;
  siguiente: NodoSimple<T> | null = null;

  constructor(dato: T) {
    this.dato = dato;
  }
}

export class ListaSimple<T> {
  cabeza: NodoSimple<T> | null = null;

  insertar(dato: T): void {
    const nuevoNodo = new NodoSimple(dato);

    if (this.cabeza === null) {
      this.cabeza = nuevoNodo;
      return;
    }

    let actual = this.cabeza;

    while (actual.siguiente !== null) {
      actual = actual.siguiente;
    }

    actual.siguiente = nuevoNodo;
  }

  eliminarPrimero(): T | null {
    if (this.cabeza === null) {
      return null;
    }

    const dato = this.cabeza.dato;
    this.cabeza = this.cabeza.siguiente;

    return dato;
  }

  obtenerTodos(): T[] {
    const datos: T[] = [];
    let actual = this.cabeza;

    while (actual !== null) {
      datos.push(actual.dato);
      actual = actual.siguiente;
    }

    return datos;
  }

  estaVacia(): boolean {
    return this.cabeza === null;
  }
}