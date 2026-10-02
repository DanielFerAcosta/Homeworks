import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import * as d3 from 'd3';

import { AuthService } from '../../services/auth';
import { BinarySearchTree } from './models/binary-search-tree';
import { MenuItem } from './models/menu-item';
import { TreeNode } from './models/tree-node';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, NgTemplateOutlet],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements AfterViewInit {
  @ViewChild('treeContainer')
  treeContainer!: ElementRef<HTMLElement>;

  readonly authService = inject(AuthService);

  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);

  tree = new BinarySearchTree();

  numeroBusqueda: number | null = null;
  resultadoBusqueda = '';

  menuTree: MenuItem[] = [
    {
      title: 'Profile',
      link: '/profile',
      component: 'ProfileComponent'
    },
    {
      title: 'Messages',
      link: '/messages',
      component: 'MessagesComponent'
    },
    {
      title: 'Settings',
      children: [
        {
          title: 'Account',
          link: '/settings/account',
          component: 'AccountComponent'
        },
        {
          title: 'Profile',
          link: '/settings/profile',
          component: 'SettingsProfileComponent'
        },
        {
          title: 'Security & Privacy',
          link: '/settings/security',
          component: 'SecurityComponent'
        },
        {
          title: 'Password',
          link: '/settings/password',
          component: 'PasswordComponent'
        },
        {
          title: 'Notifications',
          link: '/settings/notifications',
          component: 'NotificationsComponent'
        }
      ]
    },
    {
      title: 'Help',
      children: [
        {
          title: 'FAQ',
          link: '/help/faq',
          component: 'FaqComponent'
        },
        {
          title: 'Submit a Ticket',
          link: '/help/ticket',
          component: 'TicketComponent'
        },
        {
          title: 'Network Status',
          link: '/help/status',
          component: 'NetworkStatusComponent'
        }
      ]
    },
    {
      title: 'Logout',
      link: '/logout',
      component: 'LogoutComponent'
    }
  ];

  constructor() {
    const numeros = [
      50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 45
    ];

    numeros.forEach((numero) => {
      this.tree.insert(numero);
    });
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.dibujarArbol();
  }

  buscarNumero(): void {
    if (this.numeroBusqueda === null) {
      this.resultadoBusqueda = 'Ingrese un número.';
      return;
    }

    const encontrado = this.tree.contains(this.numeroBusqueda);

    this.resultadoBusqueda = encontrado
      ? `El número ${this.numeroBusqueda} sí está en el árbol.`
      : `El número ${this.numeroBusqueda} no está en el árbol.`;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  private dibujarArbol(): void {
    if (!this.treeContainer || this.tree.root === null) {
      return;
    }

    const width = 900;
    const height = 550;

    d3.select(this.treeContainer.nativeElement)
      .selectAll('*')
      .remove();

    const svg = d3
      .select(this.treeContainer.nativeElement)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet');

    const root = d3.hierarchy<TreeNode>(
      this.tree.root,
      (node) => {
        const children: TreeNode[] = [];

        if (node.left !== null) {
          children.push(node.left);
        }

        if (node.right !== null) {
          children.push(node.right);
        }

        return children.length > 0 ? children : undefined;
      }
    );

    const treeLayout = d3
      .tree<TreeNode>()
      .size([width - 100, height - 120]);

    treeLayout(root);

    svg
      .append('g')
      .selectAll('line')
      .data(root.links())
      .enter()
      .append('line')
      .attr(
        'x1',
        (link) =>
          (link.source as d3.HierarchyPointNode<TreeNode>).x + 50
      )
      .attr(
        'y1',
        (link) =>
          (link.source as d3.HierarchyPointNode<TreeNode>).y + 40
      )
      .attr(
        'x2',
        (link) =>
          (link.target as d3.HierarchyPointNode<TreeNode>).x + 50
      )
      .attr(
        'y2',
        (link) =>
          (link.target as d3.HierarchyPointNode<TreeNode>).y + 40
      )
      .attr('stroke', '#64748b')
      .attr('stroke-width', 2);

    const nodes = svg
      .append('g')
      .selectAll('g')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('transform', (node) => {
        const point = node as d3.HierarchyPointNode<TreeNode>;

        return `translate(${point.x + 50}, ${point.y + 40})`;
      });

    nodes
      .append('circle')
      .attr('r', 25)
      .attr('fill', '#4f46e5')
      .attr('stroke', '#312e81')
      .attr('stroke-width', 2);

    nodes
      .append('text')
      .text((node) => node.data.value)
      .attr('text-anchor', 'middle')
      .attr('dy', '5px')
      .attr('fill', 'white')
      .attr('font-size', '15px')
      .attr('font-weight', 'bold');
  }
}