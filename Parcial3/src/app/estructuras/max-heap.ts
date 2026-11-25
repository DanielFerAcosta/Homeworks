import { Cancion } from '../models/cancion';

export class MaxHeap {
  private datos: Cancion[] = [];

  get tamano(): number {
    return this.datos.length;
  }

  insertar(cancion: Cancion): void {
    this.datos.push(cancion);
    this.subir(this.datos.length - 1);
  }

  verMaximo(): Cancion | null {
    return this.datos[0] ?? null;
  }

  extraerMaximo(): Cancion | null {
    if (this.datos.length === 0) return null;

    const maximo = this.datos[0];
    const ultimo = this.datos.pop()!;
    if (this.datos.length > 0) {
      this.datos[0] = ultimo;
      this.bajar(0);
    }
    return maximo;
  }

  // Suma reproducciones a una canción y reacomoda el heap
  incrementar(titulo: string, cantidad = 1): void {
    const i = this.datos.findIndex((c) => c.titulo === titulo);
    if (i === -1) return;
    this.datos[i].reproducciones += cantidad;
    this.subir(i);
  }

  // TOP k: extrae k veces sobre una copia para no dañar el heap original
  top(k: number): Cancion[] {
    const copia = new MaxHeap();
    copia.datos = [...this.datos];

    const resultado: Cancion[] = [];
    while (resultado.length < k && copia.tamano > 0) {
      resultado.push(copia.extraerMaximo()!);
    }
    return resultado;
  }

  private subir(i: number): void {
    while (i > 0) {
      const padre = Math.floor((i - 1) / 2);
      if (this.datos[i].reproducciones <= this.datos[padre].reproducciones) break;
      this.intercambiar(i, padre);
      i = padre;
    }
  }

  private bajar(i: number): void {
    const n = this.datos.length;
    while (true) {
      const izq = 2 * i + 1;
      const der = 2 * i + 2;
      let mayor = i;

      if (izq < n && this.datos[izq].reproducciones > this.datos[mayor].reproducciones) mayor = izq;
      if (der < n && this.datos[der].reproducciones > this.datos[mayor].reproducciones) mayor = der;
      if (mayor === i) break;

      this.intercambiar(i, mayor);
      i = mayor;
    }
  }

  private intercambiar(a: number, b: number): void {
    [this.datos[a], this.datos[b]] = [this.datos[b], this.datos[a]];
  }
}