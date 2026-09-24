import { TreeNode } from './tree-node';

export class BinarySearchTree {

  root: TreeNode | null = null;

  // Insertar un número
  insert(value: number): void {

    const newNode = new TreeNode(value);

    if (this.root === null) {
      this.root = newNode;
      return;
    }

    this.insertNode(this.root, newNode);
  }

  private insertNode(
    current: TreeNode,
    newNode: TreeNode
  ): void {

    if (newNode.value < current.value) {

      if (current.left === null) {
        current.left = newNode;
      } else {
        this.insertNode(current.left, newNode);
      }

    } else {

      if (current.right === null) {
        current.right = newNode;
      } else {
        this.insertNode(current.right, newNode);
      }

    }
  }


  // Buscar un valor
  contains(value: number): boolean {

    return this.searchNode(this.root, value);
  }

  private searchNode(
    node: TreeNode | null,
    value: number
  ): boolean {

    if (node === null) {
      return false;
    }

    if (node.value === value) {
      return true;
    }

    if (value < node.value) {
      return this.searchNode(node.left, value);
    }

    return this.searchNode(node.right, value);
  }


  // Recorrido INORDEN
  inorder(): number[] {

    const result: number[] = [];

    this.inorderNode(this.root, result);

    return result;
  }

  private inorderNode(
    node: TreeNode | null,
    result: number[]
  ): void {

    if (node === null) {
      return;
    }

    this.inorderNode(node.left, result);

    result.push(node.value);

    this.inorderNode(node.right, result);
  }


  // Recorrido PREORDEN
  preorder(): number[] {

    const result: number[] = [];

    this.preorderNode(this.root, result);

    return result;
  }

  private preorderNode(
    node: TreeNode | null,
    result: number[]
  ): void {

    if (node === null) {
      return;
    }

    result.push(node.value);

    this.preorderNode(node.left, result);

    this.preorderNode(node.right, result);
  }


  // Recorrido POSTORDEN
  postorder(): number[] {

    const result: number[] = [];

    this.postorderNode(this.root, result);

    return result;
  }

  private postorderNode(
    node: TreeNode | null,
    result: number[]
  ): void {

    if (node === null) {
      return;
    }

    this.postorderNode(node.left, result);

    this.postorderNode(node.right, result);

    result.push(node.value);
  }
}