export class DoublyNode<T> {

  data: T;

  next: DoublyNode<T> | null = null;

  previous: DoublyNode<T> | null = null;

  constructor(data: T) {
    this.data = data;
  }
}