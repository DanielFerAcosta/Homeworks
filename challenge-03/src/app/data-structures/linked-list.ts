import { Node } from '../models/node';

export class LinkedList<T> {

  private head: Node<T> | null = null;
  private size = 0;

  add(data: T): void {

    const newNode = new Node(data);

    if (this.head === null) {
      this.head = newNode;
    } else {

      let current = this.head;

      while (current.next !== null) {
        current = current.next;
      }

      current.next = newNode;
    }

    this.size++;
  }

  get(index: number): T | null {

    if (index < 0 || index >= this.size) {
      return null;
    }

    let current = this.head;
    let counter = 0;

    while (current !== null) {

      if (counter === index) {
        return current.data;
      }

      current = current.next;
      counter++;
    }

    return null;
  }

  getSize(): number {
    return this.size;
  }

  toArray(): T[] {

    const result: T[] = [];

    let current = this.head;

    while (current !== null) {
      result.push(current.data);
      current = current.next;
    }

    return result;
  }
}