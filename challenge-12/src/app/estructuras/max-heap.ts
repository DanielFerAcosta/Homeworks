import { Producto } from '../models/producto';

export class MaxHeap {
  private readonly elementos: Producto[];

  constructor(productos: Producto[] = []) {
    this.elementos = productos.map(producto => ({
      ...producto
    }));

    this.heapify();
  }

  size(): number {
    return this.elementos.length;
  }

  isEmpty(): boolean {
    return this.elementos.length === 0;
  }

  peek(): Producto | undefined {
    const primero = this.elementos[0];

    return primero ? { ...primero } : undefined;
  }

  toArray(): Producto[] {
    return this.elementos.map(producto => ({
      ...producto
    }));
  }

  push(producto: Producto): void {
    this.elementos.push({ ...producto });

    this.percolateUp(this.elementos.length - 1);
  }

  pop(): Producto | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    const mayor = this.elementos[0];
    const ultimo = this.elementos.pop()!;

    if (!this.isEmpty()) {
      this.elementos[0] = ultimo;
      this.percolateDown(0);
    }

    return { ...mayor };
  }

  private heapify(): void {
    const ultimoPadre =
      Math.floor(this.elementos.length / 2) - 1;

    for (let indice = ultimoPadre; indice >= 0; indice--) {
      this.percolateDown(indice);
    }
  }

  private percolateUp(indice: number): void {
    while (indice > 0) {
      const padre = Math.floor((indice - 1) / 2);

      if (
        !this.tieneMayorPrioridad(
          this.elementos[indice],
          this.elementos[padre]
        )
      ) {
        break;
      }

      this.swap(indice, padre);
      indice = padre;
    }
  }

  private percolateDown(indice: number): void {
    const cantidad = this.elementos.length;

    while (true) {
      const izquierdo = indice * 2 + 1;
      const derecho = indice * 2 + 2;

      let mayor = indice;

      if (
        izquierdo < cantidad &&
        this.tieneMayorPrioridad(
          this.elementos[izquierdo],
          this.elementos[mayor]
        )
      ) {
        mayor = izquierdo;
      }

      if (
        derecho < cantidad &&
        this.tieneMayorPrioridad(
          this.elementos[derecho],
          this.elementos[mayor]
        )
      ) {
        mayor = derecho;
      }

      if (mayor === indice) {
        break;
      }

      this.swap(indice, mayor);
      indice = mayor;
    }
  }

  private tieneMayorPrioridad(
    primero: Producto,
    segundo: Producto
  ): boolean {
    if (primero.popularity !== segundo.popularity) {
      return primero.popularity > segundo.popularity;
    }

    return primero.name.localeCompare(segundo.name) < 0;
  }

  private swap(primero: number, segundo: number): void {
    [
      this.elementos[primero],
      this.elementos[segundo]
    ] = [
      this.elementos[segundo],
      this.elementos[primero]
    ];
  }
}