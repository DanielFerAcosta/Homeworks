export class TreeNode {

  value: number;

  left: TreeNode | null = null;
  right: TreeNode | null = null;

  constructor(value: number) {
    this.value = value;
  }
}