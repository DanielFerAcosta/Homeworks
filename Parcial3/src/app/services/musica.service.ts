import { Injectable, computed, signal } from '@angular/core';
import { Cancion } from '../models/cancion';
import { Trie } from '../estructuras/trie';
import { MaxHeap } from '../estructuras/max-heap';
import { Grafo } from '../estructuras/grafo';
import { CANCIONES_INICIALES, RELACIONES_INICIALES } from '../data/canciones';

@Injectable({ providedIn: 'root' })
export class MusicaService {
  private readonly trie = new Trie();
  private readonly heap = new MaxHeap();
  private readonly grafo = new Grafo();
  private readonly catalogo = new Map<string, Cancion>();

  // Cambia cada vez que se modifican las estructuras, para refrescar la vista
  private readonly version = signal(0);

  readonly seleccionada = signal<string | null>(null);

  readonly total = computed(() => {
    this.version();
    return this.catalogo.size;
  });

  readonly ranking = computed(() => {
    this.version();
    return this.heap.top(5);
  });

  readonly titulos = computed(() => {
    this.version();
    return [...this.catalogo.values()].map((c) => c.titulo).sort((a, b) => a.localeCompare(b));
  });

  readonly recomendaciones = computed(() => {
    this.version();
    const titulo = this.seleccionada();
    return titulo ? this.grafo.recomendar(titulo) : [];
  });

  constructor() {
    for (const cancion of CANCIONES_INICIALES) {
      this.registrar({ ...cancion });
    }
    for (const [a, b] of RELACIONES_INICIALES) {
      this.grafo.agregarArista(a, b);
    }
    this.seleccionada.set(this.heap.verMaximo()?.titulo ?? null);
  }

  sugerencias(prefijo: string): string[] {
    this.version();
    return this.trie.sugerencias(prefijo);
  }

  existe(titulo: string): boolean {
    return this.trie.buscar(titulo);
  }

  obtener(titulo: string): Cancion | undefined {
    this.version();
    return this.catalogo.get(titulo.trim().toLowerCase());
  }

  seleccionar(titulo: string): void {
    const cancion = this.obtener(titulo);
    if (cancion) this.seleccionada.set(cancion.titulo);
  }

  escuchar(titulo: string): void {
    this.heap.incrementar(titulo);
    this.version.update((v) => v + 1);
  }

  agregar(nueva: Cancion, relacionada: string | null): { ok: boolean; texto: string } {
    const titulo = nueva.titulo.trim();
    if (!titulo) return { ok: false, texto: 'Escribe un título.' };
    if (this.trie.buscar(titulo)) return { ok: false, texto: `"${titulo}" ya existe.` };

    this.registrar({ ...nueva, titulo });
    if (relacionada) this.grafo.agregarArista(titulo, relacionada);
    this.version.update((v) => v + 1);
    return { ok: true, texto: `"${titulo}" agregada al catálogo.` };
  }

  // Inserta la canción en las tres estructuras
  private registrar(cancion: Cancion): void {
    this.trie.insertar(cancion.titulo);
    this.heap.insertar(cancion);
    this.grafo.agregarVertice(cancion.titulo);
    this.catalogo.set(cancion.titulo.toLowerCase(), cancion);
  }
}