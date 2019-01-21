import Immutable from 'seamless-immutable'
import cytoscape from 'cytoscape'

import {
  NODE_TYPE_ACCOUNTABILITY,
  NODE_TYPE_PERSON,
  NODE_TYPE_PRIORITY
} from './vastConstants'

const CLASS_PERSON = NODE_TYPE_PERSON
const CLASS_ACCOUNTABILITY = NODE_TYPE_ACCOUNTABILITY
const CLASS_PRIORITY = NODE_TYPE_PRIORITY

const nodes = [
  {
    data: {
      id: '1',
      label: 'Person A',
      group: NODE_TYPE_PERSON
    },
    classes: [CLASS_PERSON]
  },
  {
    data: {
      id: '2',
      label: 'Person B',
      group: NODE_TYPE_PERSON
    },
    classes: [CLASS_PERSON]
  },
  {
    data: {
      id: '3',
      label: 'Accountability 1',
      group: NODE_TYPE_ACCOUNTABILITY
    },
    classes: [CLASS_ACCOUNTABILITY]
  },
  {
    data: {
      id: '4',
      label: 'Accountability 2',
      group: NODE_TYPE_ACCOUNTABILITY
    },
    classes: [CLASS_ACCOUNTABILITY]
  },
  {
    data: {
      id: '5',
      label: 'Accountability 3',
      group: NODE_TYPE_ACCOUNTABILITY
    },
    classes: [CLASS_ACCOUNTABILITY]
  }
]

const edges = [
  { data: { id: 'e13', source: '1', target: '3' } },
  { data: { id: 'e12', source: '1', target: '2' } },
  { data: { id: 'e24', source: '2', target: '4' } },
  { data: { id: 'e25', source: '2', target: '5' } }
]

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

export default {
  graph: cytoscape({
    elements: {
      nodes,
      edges
    },
    style
  }),
  prefs: Immutable.from({
    selectedNodeTypes: [
      NODE_TYPE_ACCOUNTABILITY,
      NODE_TYPE_PERSON,
      NODE_TYPE_PRIORITY
    ]
  }),
  graphLayout: Immutable.from({
    name: 'grid',
    rows: 3
  }),

  // Customize what's displayed in Redux Devtools.  - Note: Cannot use the arrow function
  // see: https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md
  toJSON() {
    const { graph, ...rest } = this
    return {
      // Use Cytoscape's built-in json() serialization method
      graph: this.graph.json(),
      ...rest
    }
  }
}
