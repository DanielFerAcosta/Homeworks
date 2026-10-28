import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  ViewChild
} from '@angular/core';

import { createElement } from 'react';

import {
  render,
  unmountComponentAtNode
} from 'react-dom';

import { Graph } from 'react-d3-graph';

import { DatosVisuales } from '../../models/nodo';

@Component({
  selector: 'app-vista-grafo',
  standalone: true,
  template: '<div #contenedor></div>',
  styles: `
    :host {
      display: block;
      overflow-x: auto;
      border-radius: 12px;
      background: #f8fafc;
    }
  `
})
export class VistaGrafo
  implements AfterViewInit, OnChanges, OnDestroy {

  @Input({ required: true })
  datos!: DatosVisuales;

  @ViewChild('contenedor', { static: true })
  private contenedor!: ElementRef<HTMLDivElement>;

  private listo = false;
  private version = 0;

  ngAfterViewInit(): void {
    this.listo = true;
    this.dibujar();
  }

  ngOnChanges(): void {
    if (this.listo) {
      this.dibujar();
    }
  }

  ngOnDestroy(): void {
    if (this.listo) {
      unmountComponentAtNode(
        this.contenedor.nativeElement
      );
    }
  }

  private dibujar(): void {
    const data = {
      nodes: this.datos.nodes.map(nodo => ({ ...nodo })),
      links: this.datos.links.map(enlace => ({ ...enlace }))
    };

    const elemento = createElement(Graph, {
      key: ++this.version,
      id: 'grafo-amigos-ciudades',
      data,
      config: {
        width: 900,
        height: 500,
        directed: false,
        nodeHighlightBehavior: true,

        node: {
          fontSize: 12,
          labelProperty: 'label',
          highlightStrokeColor: '#0f172a'
        },

        link: {
          strokeWidth: 2,
          highlightColor: '#0f172a'
        },

        d3: {
          gravity: -350,
          linkLength: 150
        }
      }
    });

    render(
      elemento,
      this.contenedor.nativeElement
    );
  }
}