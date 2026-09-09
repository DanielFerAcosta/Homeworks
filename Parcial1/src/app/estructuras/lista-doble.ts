export class NodoDoble<T> {
  dato: T;
  anterior: NodoDoble<T> | null = null;
  siguiente: NodoDoble<T> | null = null;

  constructor(dato: T) {
    this.dato = dato;
  }
}

export class ListaDoble<T> {
  cabeza: NodoDoble<T> | null = null;
  cola: NodoDoble<T> | null = null;

  insertar(dato: T): void {
    const nuevoNodo = new NodoDoble(dato);

    if (this.cabeza === null) {
      this.cabeza = nuevoNodo;
      this.cola = nuevoNodo;
      return;
    }

    nuevoNodo.anterior = this.cola;

    if (this.cola !== null) {
      this.cola.siguiente = nuevoNodo;
    }

    this.cola = nuevoNodo;
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

  obtenerTodosInverso(): T[] {
    const datos: T[] = [];
    let actual = this.cola;

    while (actual !== null) {
      datos.push(actual.dato);
      actual = actual.anterior;
    }

    return datos;
  }
}