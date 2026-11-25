export interface Recomendacion {
  titulo: string;
  nivel: number; // 1 = conexión directa, 2 = a dos saltos
}

export class Grafo {
  // Lista de adyacencia
  private adyacencia = new Map<string, Set<string>>();

  agregarVertice(titulo: string): void {
    if (!this.adyacencia.has(titulo)) {
      this.adyacencia.set(titulo, new Set());
    }
  }

  // No dirigido: la arista se guarda en ambos sentidos
  agregarArista(a: string, b: string): void {
    if (a === b) return;
    this.agregarVertice(a);
    this.agregarVertice(b);
    this.adyacencia.get(a)!.add(b);
    this.adyacencia.get(b)!.add(a);
  }

  vecinos(titulo: string): string[] {
    return [...(this.adyacencia.get(titulo) ?? [])];
  }

  // BFS desde la canción hasta la profundidad indicada
  recomendar(origen: string, profundidadMax = 2): Recomendacion[] {
    if (!this.adyacencia.has(origen)) return [];

    const visitados = new Set<string>([origen]);
    const cola: Recomendacion[] = [{ titulo: origen, nivel: 0 }];
    const resultado: Recomendacion[] = [];

    while (cola.length > 0) {
      const actual = cola.shift()!;
      if (actual.nivel === profundidadMax) continue;

      for (const vecino of this.adyacencia.get(actual.titulo)!) {
        if (visitados.has(vecino)) continue;
        visitados.add(vecino);
        const item = { titulo: vecino, nivel: actual.nivel + 1 };
        resultado.push(item);
        cola.push(item);
      }
    }
    return resultado;
  }
}