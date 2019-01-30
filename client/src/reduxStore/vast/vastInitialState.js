import Immutable from 'seamless-immutable'
import cytoscape from 'cytoscape'
import cola from 'cytoscape-cola'

import {
  NODE_TYPE_ACCOUNTABILITY,
  NODE_TYPE_PERSON,
  CLASS_ACCOUNTABILITY,
  CLASS_PERSON,
  CLASS_PRIORITY,
  CLASS_HIDDEN
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
          // so we can see the ids
          label: 'data(label)',
          // height: 80,
          // width: 80,
          'background-fit': 'cover',
          'border-color': '#000',
          'border-width': 3,
          'border-opacity': 0.5
        }
      },
      {
        selector: `node.${CLASS_PERSON}`,
        style: {
          // https://material.io/tools/icons/?search=person&icon=person_outline&style=outline
          'background-image':
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAQAAABLCVATAAABJElEQVR4Ae3TgUZDURjA8V/BSABB6SlKRlCgBfQIKUA9QUKvUAEFAT1EENLqAVJFENkUkG3DbF9zGWN23XtFyn5/cC7345zjmPh3Sva9CuHVvpKC5j2KoR7NK2DKrRB6nvr1hFA1JbcdIdQsgRW1ZL0rt3shVAxUkvW93JpCc+RLQ26NkUGtYoPuhLBpYLPo1pLDVlcGZfWihz2tKrl+L/0G1z+tgAUPYqgHCwoq2Rs8EXtKft+MDYeO+h2qmJHbrB1X3nTFUF1vruyalcmiEw2R0pdTi9JZ8jn0Q9WFA1vWrNt27F1I8mFZirKmENrOrBrFqnNtITSVjXUjhEtz0sy5FMKNsTpCTRZ1oWOsEJ5l8SJE+qCW6wy1pA/K3s8O+uMmvgE/VuBe4gbdDAAAAABJRU5ErkJggg=='
          //   'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgNS45YzEuMTYgMCAyLjEuOTQgMi4xIDIuMXMtLjk0IDIuMS0yLjEgMi4xUzkuOSA5LjE2IDkuOSA4cy45NC0yLjEgMi4xLTIuMW0wIDljMi45NyAwIDYuMSAxLjQ2IDYuMSAyLjF2MS4xSDUuOVYxN2MwLS42NCAzLjEzLTIuMSA2LjEtMi4xTTEyIDRDOS43OSA0IDggNS43OSA4IDhzMS43OSA0IDQgNCA0LTEuNzkgNC00LTEuNzktNC00LTR6bTAgOWMtMi42NyAwLTggMS4zNC04IDR2M2gxNnYtM2MwLTIuNjYtNS4zMy00LTgtNHoiLz48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PC9zdmc+'
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
        selector: `.${CLASS_HIDDEN}`,
        style: {
          display: 'none'
        }
      },
      {
        selector: 'edge',
        style: {
          'curve-style': 'bezier',
          width: 6,
          'target-arrow-shape': 'triangle',
          'line-color': '#ffaaaa',
          'target-arrow-color': '#ffaaaa'
        }
      }
    ],
    layout: {
      name: 'cola',
      padding: '20'
    }
  }),
  model: Immutable.from({
    nodes: {
      'fae3763d-2cb9-4d54-9132-e34bc14f45f2': {
        label: 'Person A',
        type: NODE_TYPE_PERSON
      },
      '9a5cbd26-98d5-4057-977a-88f6d776542c': {
        label: 'Person B',
        type: NODE_TYPE_PERSON
      },
      'f00da641-6da9-4688-8763-9c4dac9d37eb': {
        label: 'Accountability 1',
        type: NODE_TYPE_ACCOUNTABILITY
      },
      'c8566db9-bf1f-45b0-b968-d79f22ce76c2': {
        label: 'Accountability 2',
        type: NODE_TYPE_ACCOUNTABILITY
      },
      '95c54d46-0f7b-49ba-96cb-e4a5b96734fc': {
        label: 'Accountability 3',
        type: NODE_TYPE_ACCOUNTABILITY
      }
    },
    edges: {
      '9a66d59d-65a3-4c78-8e97-a81c207942aa': {
        // 'A1'
        source: 'fae3763d-2cb9-4d54-9132-e34bc14f45f2',
        target: 'f00da641-6da9-4688-8763-9c4dac9d37eb'
      },
      'a47148ed-4ca9-49ed-81c0-5b913ba529ed': {
        // 'AB'
        source: 'fae3763d-2cb9-4d54-9132-e34bc14f45f2',
        target: '9a5cbd26-98d5-4057-977a-88f6d776542c'
      },
      'a4765819-018a-4e5e-b632-7a691e98993f': {
        // 'B2'
        source: '9a5cbd26-98d5-4057-977a-88f6d776542c',
        target: 'c8566db9-bf1f-45b0-b968-d79f22ce76c2'
      },
      '6a94e60a-9c0e-495f-8133-20384bd699b3': {
        // 'A3'
        source: 'fae3763d-2cb9-4d54-9132-e34bc14f45f2',
        target: '95c54d46-0f7b-49ba-96cb-e4a5b96734fc'
      },
      '69ff6993-355c-4547-be54-57e58a133770': {
        // 'B3'
        source: '9a5cbd26-98d5-4057-977a-88f6d776542c',
        target: '95c54d46-0f7b-49ba-96cb-e4a5b96734fc'
      }
    }
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
