import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import * as d3 from 'd3';

import { BinarySearchTree } from './models/binary-search-tree';
import { TreeNode } from './models/tree-node';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements AfterViewInit {

  @ViewChild('treeContainer')
  treeContainer!: ElementRef;

  tree = new BinarySearchTree();

  numeroBusqueda: number | null = null;

  resultadoBusqueda = '';


  constructor() {

    const numeros = [
      50,
      30,
      70,
      20,
      40,
      60,
      80,
      10,
      25,
      35,
      45
    ];

    numeros.forEach(numero => {
      this.tree.insert(numero);
    });
  }


  ngAfterViewInit(): void {

    // Mostrar los recorridos en la consola
    this.mostrarRecorridos();

    // Dibujar el árbol
    this.dibujarArbol();
  }

  mostrarRecorridos(): void {

    console.log(
      'Inorden:',
      this.tree.inorder()
    );

    console.log(
      'Preorden:',
      this.tree.preorder()
    );

    console.log(
      'Postorden:',
      this.tree.postorder()
    );
  }


  buscarNumero(): void {

    if (this.numeroBusqueda === null) {

      this.resultadoBusqueda =
        'Ingrese un número.';

      return;
    }


    const encontrado = this.tree.contains(
      this.numeroBusqueda
    );


    if (encontrado) {

      this.resultadoBusqueda =
        `El número ${this.numeroBusqueda} sí está en el árbol.`;

    } else {

      this.resultadoBusqueda =
        `El número ${this.numeroBusqueda} no está en el árbol.`;
    }
  }


  dibujarArbol(): void {

    const width = 900;
    const height = 550;


    // Crear SVG
    const svg = d3
      .select(this.treeContainer.nativeElement)
      .append('svg')
      .attr('width', width)
      .attr('height', height);



    if (this.tree.root === null) {
      return;
    }



    const root = d3.hierarchy<TreeNode>(
      this.tree.root,

      node => {

        const children: TreeNode[] = [];


        // Hijo izquierdo
        if (node.left !== null) {

          children.push(node.left);
        }


        // Hijo derecho
        if (node.right !== null) {

          children.push(node.right);
        }


        return children.length > 0
          ? children
          : undefined;
      }
    );



    const treeLayout = d3
      .tree<TreeNode>()
      .size([
        width - 100,
        height - 120
      ]);


    treeLayout(root);



    svg
      .append('g')
      .selectAll('line')
      .data(root.links())
      .enter()
      .append('line')

      .attr(
        'x1',
        link => {

          const source =
            link.source as d3.HierarchyPointNode<TreeNode>;

          return source.x + 50;
        }
      )

      .attr(
        'y1',
        link => {

          const source =
            link.source as d3.HierarchyPointNode<TreeNode>;

          return source.y + 40;
        }
      )

      .attr(
        'x2',
        link => {

          const target =
            link.target as d3.HierarchyPointNode<TreeNode>;

          return target.x + 50;
        }
      )

      .attr(
        'y2',
        link => {

          const target =
            link.target as d3.HierarchyPointNode<TreeNode>;

          return target.y + 40;
        }
      )

      .attr('stroke', '#555')
      .attr('stroke-width', 2);



    const nodes = svg
      .append('g')
      .selectAll('g')
      .data(root.descendants())
      .enter()
      .append('g')

      .attr(
        'transform',
        node => {

          const currentNode =
            node as d3.HierarchyPointNode<TreeNode>;

          return `translate(
            ${currentNode.x + 50},
            ${currentNode.y + 40}
          )`;
        }
      );



    nodes
      .append('circle')
      .attr('r', 25)
      .attr('fill', '#4f46e5')
      .attr('stroke', '#222')
      .attr('stroke-width', 2);




    nodes
      .append('text')
      .text(node => node.data.value)
      .attr('text-anchor', 'middle')
      .attr('dy', '5px')
      .attr('fill', 'white')
      .attr('font-size', '15px')
      .attr('font-weight', 'bold');
  }
}