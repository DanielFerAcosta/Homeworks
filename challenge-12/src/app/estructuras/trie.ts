import { Producto } from '../models/producto';
import { MaxHeap } from './max-heap';
import { NodoTrie } from './nodo-trie';

export class Trie {
  private readonly raiz = new NodoTrie();

  private cantidad = 0;

  size(): number {
    return this.cantidad;
  }

  insert(name: string, popularity: number): void {
    const nombreNormalizado = this.normalizar(name);

    if (!nombreNormalizado) {
      throw new Error('El nombre del producto es obligatorio.');
    }

    if (!Number.isFinite(popularity) || popularity < 0) {
      throw new Error(
        'La popularidad debe ser un número mayor o igual a cero.'
      );
    }

    let actual = this.raiz;

    for (const caracter of nombreNormalizado) {
      let siguiente = actual.hijos.get(caracter);

      if (!siguiente) {
        siguiente = new NodoTrie(caracter);
        actual.hijos.set(caracter, siguiente);
      }

      actual = siguiente;
    }

    if (!actual.isEndOfWord) {
      this.cantidad++;
    }

    actual.isEndOfWord = true;

    actual.producto = {
      name: nombreNormalizado,
      popularity
    };
  }

  search(name: string): boolean {
    const nombreNormalizado = this.normalizar(name);

    if (!nombreNormalizado) {
      return false;
    }

    const nodo = this.buscarNodo(nombreNormalizado);

    return nodo?.isEndOfWord ?? false;
  }

  searchByPrefix(prefix: string): Producto[] {
    const prefijoNormalizado = this.normalizar(prefix);
    const inicio = this.buscarNodo(prefijoNormalizado);

    if (!inicio) {
      return [];
    }

    const productos: Producto[] = [];
    const pendientes: NodoTrie[] = [inicio];

    while (pendientes.length > 0) {
      const actual = pendientes.pop()!;

      if (actual.isEndOfWord && actual.producto) {
        productos.push({ ...actual.producto });
      }

      for (const hijo of actual.hijos.values()) {
        pendientes.push(hijo);
      }
    }

    return productos;
  }

  searchTopK(prefix: string, k: number): Producto[] {
    if (!Number.isInteger(k) || k < 1) {
      throw new Error('K debe ser un número entero mayor que cero.');
    }

    const candidatos = this.searchByPrefix(prefix);
    const heap = new MaxHeap(candidatos);

    const resultado: Producto[] = [];

    while (resultado.length < k && !heap.isEmpty()) {
      resultado.push(heap.pop()!);
    }

    return resultado;
  }

  private buscarNodo(texto: string): NodoTrie | null {
    let actual = this.raiz;

    for (const caracter of texto) {
      const siguiente = actual.hijos.get(caracter);

      if (!siguiente) {
        return null;
      }

      actual = siguiente;
    }

    return actual;
  }

  private normalizar(texto: string): string {
    return texto
      .trim()
      .toLowerCase()
      .replace(/\s+/g, ' ');
  }
}