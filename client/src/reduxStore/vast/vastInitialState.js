import Immutable from 'seamless-immutable'
import cytoscape from 'cytoscape'
import cola from 'cytoscape-cola'

import {
  NODE_TYPE_ACCOUNTABILITY,
  NODE_TYPE_PERSON,
  CLASS_ACCOUNTABILITY,
  CLASS_PERSON,
  CLASS_PRIORITY
} from './vastConstants'

// TODO: Is there a better place for this?
cytoscape.use(cola)

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
          'background-color': '#666',
          // so we can see the ids
          label: 'data(label)'
        }
      },
      {
        selector: `node.${CLASS_PERSON}`,
        style: {
          'background-color': '#FF0000'
        }
      },
      {
        selector: `node.${CLASS_ACCOUNTABILITY}`,
        style: {
          'background-color': '#00FF00'
        }
      },
      {
        selector: `node.${CLASS_PRIORITY}`,
        style: {
          'background-color': '#0000FF'
        }
      },
      {
        selector: 'edge',
        style: {
          width: 3,
          'line-color': '#ccc',
          'target-arrow-color': '#ccc',
          'target-arrow-shape': 'triangle'
        }
      }
    ],
    layout: {
      name: 'cola'
    }
  }),
  model: Immutable.from({
    nodes: [
      {
        id: '1',
        label: 'Person A',
        type: NODE_TYPE_PERSON
      },
      {
        id: '2',
        label: 'Person B',
        type: NODE_TYPE_PERSON
      },
      {
        id: '3',
        label: 'Accountability 1',
        type: NODE_TYPE_ACCOUNTABILITY
      },
      {
        id: '4',
        label: 'Accountability 2',
        type: NODE_TYPE_ACCOUNTABILITY
      },
      {
        id: '5',
        label: 'Accountability 3',
        type: NODE_TYPE_ACCOUNTABILITY
      }
    ],
    edges: [
      { id: 'e13', source: '1', target: '3' },
      { id: 'e12', source: '1', target: '2' },
      { id: 'e24', source: '2', target: '4' },
      { id: 'e15', source: '1', target: '5' },
      { id: 'e25', source: '2', target: '5' }
    ]
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

  // // Customize what's displayed in Redux Devtools.  - Note: Cannot use the arrow function
  // // see: https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md
  // toJSON() {
  //   const { views, ...rest } = this
  //   return {
  //     views: Object.entries(views).reduce((acc, view) => {
  //       const [key, value] = view
  //       const { graph, ...rest2 } = value
  //       // Use Cytoscape's built-in json() serialization method
  //       acc[key] = { graph: graph ? graph.json() : graph, ...rest2 }
  //       return acc
  //     }, {}),
  //     ...rest
  //   }
  // }
}
