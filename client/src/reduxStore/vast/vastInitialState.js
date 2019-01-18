import Immutable from 'seamless-immutable'
import vis from 'vis'

import {
  NODE_TYPE_ACCOUNTABILITY,
  NODE_TYPE_PERSON,
  NODE_TYPE_PRIORITY
} from './vastConstants'

export default {
  prefs: Immutable.from({
    selectedNodeTypes: [
      NODE_TYPE_ACCOUNTABILITY,
      NODE_TYPE_PERSON,
      NODE_TYPE_PRIORITY
    ],
    networkOptions: {
      layout: {
        randomSeed: 42
      },
      nodes: {
        shape: 'dot',
        size: 20,
        font: {
          size: 15
          // color: '#ffffff'
        },
        borderWidth: 2
      },
      edges: {
        width: 2
      },
      groups: {
        [NODE_TYPE_PERSON]: {
          color: { background: 'red' /* , border: 'white' */ },
          shape: 'diamond'
        },
        [NODE_TYPE_ACCOUNTABILITY]: {
          shape: 'square',
          color: 'cyan'
        },
        [NODE_TYPE_PRIORITY]: {
          color: 'rgb(0,255,140)'
        }
      }
    }
  }),
  nodes: new vis.DataSet([
    { id: 1, label: 'Person A', group: NODE_TYPE_PERSON },
    { id: 2, label: 'Person B', group: NODE_TYPE_PERSON },
    { id: 3, label: 'Accountability 1', group: NODE_TYPE_ACCOUNTABILITY },
    { id: 4, label: 'Accountability 2', group: NODE_TYPE_ACCOUNTABILITY },
    { id: 5, label: 'Accountability 3', group: NODE_TYPE_ACCOUNTABILITY }
  ]),
  edges: new vis.DataSet([
    { from: 1, to: 3 },
    { from: 1, to: 2 },
    { from: 2, to: 4 },
    { from: 2, to: 5 }
  ])
}
