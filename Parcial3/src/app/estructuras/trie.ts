class NodoTrie {
  hijos = new Map<string, NodoTrie>();
  esFinDePalabra = false;
  titulo: string | null = null; // título original (con mayúsculas)
}

export class Trie {
  private raiz = new NodoTrie();

  // 1. Insertar canción
  insertar(titulo: string): void {
    let nodo = this.raiz;
    for (const letra of this.normalizar(titulo)) {
      if (!nodo.hijos.has(letra)) {
        nodo.hijos.set(letra, new NodoTrie());
      }
      nodo = nodo.hijos.get(letra)!;
    }
    nodo.esFinDePalabra = true;
    nodo.titulo = titulo.trim();
  }

  // 2. Buscar si una canción existe
  buscar(titulo: string): boolean {
    const nodo = this.recorrer(this.normalizar(titulo));
    return nodo !== null && nodo.esFinDePalabra;
  }

  // 3. Sugerencias por prefijo
  sugerencias(prefijo: string, limite = 8): string[] {
    const texto = this.normalizar(prefijo);
    if (!texto) return [];

    const nodo = this.recorrer(texto);
    if (!nodo) return [];

    const resultado: string[] = [];
    this.recolectar(nodo, resultado, limite);
    return resultado;
  }

  private recorrer(texto: string): NodoTrie | null {
    let nodo = this.raiz;
    for (const letra of texto) {
      const siguiente = nodo.hijos.get(letra);
      if (!siguiente) return null;
      nodo = siguiente;
    }
    return nodo;
  }

  // DFS en orden alfabético desde el nodo del prefijo
  private recolectar(nodo: NodoTrie, resultado: string[], limite: number): void {
    if (resultado.length >= limite) return;
    if (nodo.esFinDePalabra && nodo.titulo) {
      resultado.push(nodo.titulo);
    }
    const letras = [...nodo.hijos.keys()].sort();
    for (const letra of letras) {
      this.recolectar(nodo.hijos.get(letra)!, resultado, limite);
      if (resultado.length >= limite) return;
    }
  }

  private normalizar(texto: string): string {
    return texto.trim().toLowerCase();
  }
}