import { TreeNode } from './tree-node';

export class BinarySearchTree {
  root: TreeNode | null = null;

  insert(value: number): void {
    const newNode = new TreeNode(value);

    if (this.root === null) {
      this.root = newNode;
      return;
    }

    this.insertNode(this.root, newNode);
  }

  contains(value: number): boolean {
    return this.searchNode(this.root, value);
  }

  inorder(): number[] {
    const result: number[] = [];
    this.inorderNode(this.root, result);
    return result;
  }

  preorder(): number[] {
    const result: number[] = [];
    this.preorderNode(this.root, result);
    return result;
  }

  postorder(): number[] {
    const result: number[] = [];
    this.postorderNode(this.root, result);
    return result;
  }

  private insertNode(current: TreeNode, newNode: TreeNode): void {
    if (newNode.value < current.value) {
      if (current.left === null) {
        current.left = newNode;
      } else {
        this.insertNode(current.left, newNode);
      }

      return;
    }

    if (current.right === null) {
      current.right = newNode;
    } else {
      this.insertNode(current.right, newNode);
    }
  }

  private searchNode(node: TreeNode | null, value: number): boolean {
    if (node === null) {
      return false;
    }

    if (node.value === value) {
      return true;
    }

    return value < node.value
      ? this.searchNode(node.left, value)
      : this.searchNode(node.right, value);
  }

  private inorderNode(node: TreeNode | null, result: number[]): void {
    if (node === null) {
      return;
    }

    this.inorderNode(node.left, result);
    result.push(node.value);
    this.inorderNode(node.right, result);
  }

  private preorderNode(node: TreeNode | null, result: number[]): void {
    if (node === null) {
      return;
    }

    result.push(node.value);
    this.preorderNode(node.left, result);
    this.preorderNode(node.right, result);
  }

  private postorderNode(node: TreeNode | null, result: number[]): void {
    if (node === null) {
      return;
    }

    this.postorderNode(node.left, result);
    this.postorderNode(node.right, result);
    result.push(node.value);
  }
}