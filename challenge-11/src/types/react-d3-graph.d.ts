declare module 'react-d3-graph' {
  import { Component } from 'react';

  interface GraphNode {
    id: string;
    label: string;
    color?: string;
    size?: number;
  }

  interface GraphLink {
    source: string;
    target: string;
    color?: string;
  }

  interface GraphProps {
    id: string;

    data: {
      nodes: GraphNode[];
      links: GraphLink[];
    };

    config?: {
      width?: number;
      height?: number;
      directed?: boolean;
      nodeHighlightBehavior?: boolean;

      node?: {
        size?: number;
        fontSize?: number;
        labelProperty?: string;
        highlightStrokeColor?: string;
      };

      link?: {
        strokeWidth?: number;
        highlightColor?: string;
      };

      d3?: {
        gravity?: number;
        linkLength?: number;
      };
    };
  }

  export class Graph extends Component<GraphProps> {}
}