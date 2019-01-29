import Immutable from 'seamless-immutable'
import cytoscape from 'cytoscape'
import cola from 'cytoscape-cola'

import {
  NODE_TYPE_ACCOUNTABILITY,
  NODE_TYPE_PERSON,
  NODE_TYPE_PRIORITY,
  CLASS_ACCOUNTABILITY,
  CLASS_PERSON,
  CLASS_PRIORITY
} from './vastConstants'

cytoscape.use(cola)

const style = [
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
]

const layout = {
  name: 'cola'
}

export default {
  views: {},

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
  ],

  graph: cytoscape({
    elements: {
      nodes: [],
      edges: []
    },
    style
  }),
  graphLayout: Immutable.from(layout),
  prefs: Immutable.from({
    selectedNodeTypes: [
      NODE_TYPE_ACCOUNTABILITY,
      NODE_TYPE_PERSON,
      NODE_TYPE_PRIORITY
    ]
  }),

  // Customize what's displayed in Redux Devtools.  - Note: Cannot use the arrow function
  // see: https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md
  toJSON() {
    const { graph, graphLayout, ...rest } = this
    return {
      // Use Cytoscape's built-in json() serialization method
      graph: this.graph.json(),
      ...rest
    }
  }
}
