import { Producto } from '../models/producto';

export class NodoTrie {
  readonly hijos = new Map<string, NodoTrie>();

  isEndOfWord = false;

  producto: Producto | null = null;

  constructor(
    readonly caracter: string | null = null
  ) {}
}