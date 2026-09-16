import { Libro } from './libro';

export class PilaLibros {

  private libros: Libro[] = [];

  // Agregar un libro a la pila
  push(libro: Libro): void {
    this.libros.push(libro);
  }

  // Obtener todos los libros
  getLibros(): Libro[] {
    return this.libros;
  }

  // Sacar el último libro de la pila
  pop(): Libro | undefined {
    return this.libros.pop();
  }

  // Saber cuántos libros hay
  size(): number {
    return this.libros.length;
  }
}