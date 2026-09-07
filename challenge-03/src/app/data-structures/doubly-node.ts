import { DoublyNode } from '../models/doubly-node';

export class DoublyLinkedList<T> {

  private head: DoublyNode<T> | null = null;

  private tail: DoublyNode<T> | null = null;

  private current: DoublyNode<T> | null = null;

  add(data: T): void {

    const newNode = new DoublyNode(data);

    if (this.head === null) {

      this.head = newNode;
      this.tail = newNode;
      this.current = newNode;

      return;
    }

    newNode.previous = this.tail;

    if (this.tail) {
      this.tail.next = newNode;
    }

    this.tail = newNode;
    this.current = newNode;
  }

  next(): T | null {

    if (this.current?.next) {
      this.current = this.current.next;
      return this.current.data;
    }

    return null;
  }

  previous(): T | null {

    if (this.current?.previous) {
      this.current = this.current.previous;
      return this.current.data;
    }

    return null;
  }

  getCurrent(): T | null {

    return this.current?.data ?? null;
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