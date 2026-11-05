import {
  Injectable,
  computed,
  signal
} from '@angular/core';

import { Trie } from '../estructuras/trie';

@Injectable({
  providedIn: 'root'
})
export class BuscadorService {
  private readonly trie = new Trie();

  private readonly revision = signal(0);

  readonly productos = computed(() => {
    this.revision();

    return this.trie.searchByPrefix('');
  });

  readonly total = computed(() => {
    this.revision();

    return this.trie.size();
  });

  constructor() {
    this.trie.insert('air max', 90);
    this.trie.insert('air force', 95);
    this.trie.insert('air jordan', 85);
    this.trie.insert('adidas boost', 80);
  }

  insertar(name: string, popularity: number): void {
    this.trie.insert(name, popularity);

    this.revision.update(valor => valor + 1);
  }

  buscarPorPrefijo(prefix: string) {
    this.revision();

    return this.trie.searchByPrefix(prefix);
  }

  buscarTopK(prefix: string, k: number) {
    this.revision();

    return this.trie.searchTopK(prefix, k);
  }
}