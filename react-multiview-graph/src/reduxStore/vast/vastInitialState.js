import Immutable from 'seamless-immutable'
import cytoscape from 'cytoscape'

import cola from 'cytoscape-cola'
import ctxMenu from 'cytoscape-cxtmenu'
import edgeHandles from 'cytoscape-edgehandles'

import {
  NODE_TYPE_CLASS_MAP,
  CLASS_PERSON,
  CLASS_HIDDEN,
  CLASS_NEW,
  CLASS_FADED,
  CLASS_HIGHLIGHTED
} from './vastConstants'

import sampleData from './sampleGraph.json'

// TODO: Is there a better way to do this?
// Register plugins with Cytoscape
if (!window.cytoscapeIsRegistered) {
  cytoscape.use(cola)
  cytoscape.use(ctxMenu)
  cytoscape.use(edgeHandles)
  // Global variable is being used during development mode due to HMR
  window.cytoscapeIsRegistered = true
}

// See: https://stackoverflow.com/a/21825207/5373104
const isIE11 = !!window.MSInputMethodContext && !!document.documentMode

// Filter sample data to include only defined node types
const sampleNodes = Object.entries(sampleData.nodes).reduce(
  (acc, [id, node]) => {
    const { type } = node
    if (NODE_TYPE_CLASS_MAP[type]) {
      acc[id] = node
    }
    return acc
  },
  {}
)

// Filter sample data to include only edges for included nodes
const sampleEdges = Object.entries(sampleData.edges).reduce(
  (acc, [id, edge]) => {
    const { source, target } = edge
    if (sampleNodes[source] && sampleNodes[target]) {
      acc[id] = edge
    }
    return acc
  },
  {}
)

export default {
  graphs: {
    /* Mutable */
  },
  views: Immutable.from({
    /* Immutable */
  }),
  viewer: Immutable.from({
    activeView: null
  }),
  defaults: Immutable.from({
    style: [
      // the stylesheet for the graph
      {
        selector: 'node',
        style: {
          content: 'data(label)',
          'text-valign': 'center',
          'text-halign': 'center',
          'text-outline-width': '2',
          'text-outline-color': '#fff',
          'text-outline-opacity': '1',
          // height: 'data(size)',
          // width: 'data(size)',
          'background-fit': 'cover',
          // 'border-color': '#000'
          // 'border-width': 3,
          // 'border-opacity': 0.5
          'font-size': '10',
          'font-weight': 'bold',
          width: 'mapData(weight, 0, 100, 20, 60)',
          height: 'mapData(weight, 0, 100, 20, 60)'
        }
      },
      {
        selector: `node.${CLASS_PERSON}`,
        style: {
          // https://material.io/tools/icons/?search=person&icon=person_outline&style=outline
          'background-image': isIE11
            ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAQAAABLCVATAAABJElEQVR4Ae3TgUZDURjA8V/BSABB6SlKRlCgBfQIKUA9QUKvUAEFAT1EENLqAVJFENkUkG3DbF9zGWN23XtFyn5/cC7345zjmPh3Sva9CuHVvpKC5j2KoR7NK2DKrRB6nvr1hFA1JbcdIdQsgRW1ZL0rt3shVAxUkvW93JpCc+RLQ26NkUGtYoPuhLBpYLPo1pLDVlcGZfWihz2tKrl+L/0G1z+tgAUPYqgHCwoq2Rs8EXtKft+MDYeO+h2qmJHbrB1X3nTFUF1vruyalcmiEw2R0pdTi9JZ8jn0Q9WFA1vWrNt27F1I8mFZirKmENrOrBrFqnNtITSVjXUjhEtz0sy5FMKNsTpCTRZ1oWOsEJ5l8SJE+qCW6wy1pA/K3s8O+uMmvgE/VuBe4gbdDAAAAABJRU5ErkJggg=='
            : 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgNS45YzEuMTYgMCAyLjEuOTQgMi4xIDIuMXMtLjk0IDIuMS0yLjEgMi4xUzkuOSA5LjE2IDkuOSA4cy45NC0yLjEgMi4xLTIuMW0wIDljMi45NyAwIDYuMSAxLjQ2IDYuMSAyLjF2MS4xSDUuOVYxN2MwLS42NCAzLjEzLTIuMSA2LjEtMi4xTTEyIDRDOS43OSA0IDggNS43OSA4IDhzMS43OSA0IDQgNCA0LTEuNzkgNC00LTEuNzktNC00LTR6bTAgOWMtMi42NyAwLTggMS4zNC04IDR2M2gxNnYtM2MwLTIuNjYtNS4zMy00LTgtNHoiLz48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PC9zdmc+'
        }
      },

      // Classes for each node type
      ...Object.entries(NODE_TYPE_CLASS_MAP).map(([nodeType, details]) => ({
        selector: `node.${details.className}`,
        style: {
          'background-color': details.color,
          'text-outline-color': details.color
        }
      })),

      {
        selector: `.${CLASS_HIDDEN}`,
        style: {
          display: 'none'
        }
      },
      {
        selector: 'edge',
        style: {
          label: 'data(label)',
          'text-rotation': 'autorotate',
          'curve-style': 'bezier',
          'target-arrow-shape': 'triangle',
          'line-color': '#ffaaaa',
          'target-arrow-color': '#ffaaaa',
          'z-index': '0',
          width: '2'
        }
      },

      // Cheese Demo
      {
        selector: `node.${CLASS_HIGHLIGHTED}`,
        style: {
          'min-zoomed-font-size': '0',
          'z-index': '9999'
        }
      },
      {
        selector: `edge.${CLASS_HIGHLIGHTED}`,
        style: {
          opacity: '0.8',
          width: '4',
          'z-index': '9999'
        }
      },
      {
        selector: `.${CLASS_FADED}`,
        style: {
          events: 'no'
        }
      },
      {
        selector: `node.${CLASS_FADED}`,
        style: {
          opacity: '0.08'
        }
      },
      {
        selector: `edge.${CLASS_FADED}`,
        style: {
          opacity: '0.06'
        }
      },
      {
        selector: 'node:selected',
        style: {
          'border-color': 'rgb(187, 219, 247)',
          'border-opacity': '0.5',
          'border-width': '10'
        }
      },
      {
        selector: `.${CLASS_NEW}`,
        style: {
          'border-color': '#FF0000',
          'border-opacity': '0.5',
          'border-width': '15'
        }
      },
      {
        selector: '.filtered',
        style: {
          display: 'none'
        }
      },

      // some style for the edgeHandles extension
      {
        selector: '.eh-handle',
        style: {
          'background-color': 'red',
          width: 12,
          height: 12,
          shape: 'ellipse',
          'overlay-opacity': 0,
          'border-width': 12, // makes the handle easier to hit
          'border-opacity': 0
        }
      },
      {
        selector: '.eh-hover',
        style: {
          'background-color': 'red'
        }
      },
      {
        selector: '.eh-source',
        style: {
          'border-width': 2,
          'border-color': 'red'
        }
      },
      {
        selector: '.eh-target',
        style: {
          'border-width': 2,
          'border-color': 'red'
        }
      },
      {
        selector: '.eh-preview, .eh-ghost-edge',
        style: {
          'background-color': 'red',
          'line-color': 'red',
          'target-arrow-color': 'red',
          'source-arrow-color': 'red'
        }
      },
      {
        selector: '.eh-ghost-edge.eh-preview-active',
        style: {
          opacity: 0
        }
      }
    ],
    layout: {
      name: 'cola',
      // Start with random positions (instead of all at the origin) so it converges more quickly
      randomize: true,
      animate: true,
      nodeDimensionsIncludeLabels: true,
      edgeLength: 150
    }
  }),
  model: Immutable.from({
    nodes: sampleNodes,
    edges: sampleEdges
  }),

  // Customize what's displayed in Redux Devtools.  - Note: Cannot use the arrow function
  // see: https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md
  toJSON() {
    const { graphs, ...rest } = this
    return {
      graphs: Object.entries(graphs).reduce((acc, [id, graph]) => {
        // Use Cytoscape's built-in json() serialization method
        acc[id] = graph ? graph.json() : JSON.stringify(graph)
        return acc
      }, {}),
      ...rest
    }
  }
}
