import Immutable from 'seamless-immutable'
import cytoscape from 'cytoscape'

import cola from 'cytoscape-cola'
import ctxMenu from 'cytoscape-cxtmenu'
import edgeHandles from 'cytoscape-edgehandles'

import {
  NODE_TYPE_CLASS_MAP,
  // NODE_TYPE_ACCOUNTABILITY,
  // NODE_TYPE_PERSON,
  CLASS_ACCOUNTABILITY,
  CLASS_PERSON,
  CLASS_PRIORITY,
  CLASS_HIDDEN
} from './vastConstants'

import sampleData from './sampleGraph.json'

// TODO: Is there a better place for this?
cytoscape.use(cola)
cytoscape.use(ctxMenu)
cytoscape.use(edgeHandles)

// See: https://stackoverflow.com/a/21825207/5373104
const isIE11 = !!window.MSInputMethodContext && !!document.documentMode

// Filter sample data to include only defined node types
const sampleNodes = Object.entries(sampleData.nodes).reduce(
  (acc, [id, node]) => {
    const { type } = node
    console.log(`id=${id} - ${JSON.stringify(node)}`)
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
          // so we can see the ids
          label: 'data(label)',
          // height: 40,
          // width: 40,
          'background-fit': 'cover'
          // 'border-color': '#000'
          // 'border-width': 3,
          // 'border-opacity': 0.5
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
          label: 'data(label)',
          'text-rotation': 'autorotate',
          'curve-style': 'bezier',
          // width: 6,
          'target-arrow-shape': 'triangle',
          'line-color': '#ffaaaa',
          'target-arrow-color': '#ffaaaa'
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
      name: 'cola'
    },
    ctxMenu: {
      menuRadius: 100, // the radius of the circular menu in pixels
      selector: 'node', // elements matching this Cytoscape.js selector will trigger cxtmenus
      // an array of commands to list in the menu or a function that returns the array
      // function( ele ){ return [ /*...*/ ] }, // example function for commands
      commands: [],
      fillColor: 'rgba(0, 0, 0, 0.75)', // the background colour of the menu
      activeFillColor: 'rgba(1, 105, 217, 0.75)', // the colour used to indicate the selected command
      activePadding: 20, // additional size in pixels for the active command
      indicatorSize: 24, // the size in pixels of the pointer to the active command
      separatorWidth: 3, // the empty spacing in pixels between successive commands
      spotlightPadding: 4, // extra spacing in pixels between the element and the spotlight
      minSpotlightRadius: 24, // the minimum radius in pixels of the spotlight
      maxSpotlightRadius: 38, // the maximum radius in pixels of the spotlight
      openMenuEvents: 'cxttapstart taphold', // space-separated cytoscape events that will open the menu; only `cxttapstart` and/or `taphold` work here
      itemColor: 'white', // the colour of text in the command's content
      itemTextShadowColor: 'transparent', // the text shadow colour of the command's content
      zIndex: 9999, // the z-index of the ui div
      atMouse: false // draw menu at mouse position
    },
    edgeHandles: {
      preview: true, // whether to show added edges preview before releasing selection
      hoverDelay: 150, // time spent hovering over a target node before it is considered selected
      handleNodes: 'node', // selector/filter function for whether edges can be made from a given node
      snap: false, // when enabled, the edge can be drawn by just moving close to a target node (can be confusing on compound graphs)
      snapThreshold: 50, // the target node must be less than or equal to this many pixels away from the cursor/finger
      snapFrequency: 15, // the number of times per second (Hz) that snap checks done (lower is less expensive)
      noEdgeEventsInDraw: false, // set events:no to edges during draws, prevents mouseouts on compounds
      disableBrowserGestures: true, // during an edge drawing gesture, disable browser gestures such as two-finger trackpad swipe and pinch-to-zoom
      handlePosition(node) {
        return 'middle top' // sets the position of the handle in the format of "X-AXIS Y-AXIS" such as "left top", "middle top"
      },
      handleInDrawMode: false, // whether to show the handle in draw mode
      edgeType(sourceNode, targetNode) {
        // can return 'flat' for flat edges between nodes or 'node' for intermediate node between them
        // returning null/undefined means an edge can't be added between the two nodes
        return 'flat'
      },
      loopAllowed(node) {
        // for the specified node, return whether edges from itself to itself are allowed
        return false
      },
      nodeLoopOffset: -50, // offset for edgeType: 'node' loops
      nodeParams(sourceNode, targetNode) {
        // for edges between the specified source and target
        // return element object to be passed to cy.add() for intermediary node
        return {}
      },
      edgeParams(sourceNode, targetNode, i) {
        // for edges between the specified source and target
        // return element object to be passed to cy.add() for edge
        // NB: i indicates edge index in case of edgeType: 'node'
        return {}
      },
      ghostEdgeParams() {
        // return element object to be passed to cy.add() for the ghost edge
        // (default classes are always added for you)
        return {}
      },
      show(sourceNode) {
        // fired when handle is shown
      },
      hide(sourceNode) {
        // fired when the handle is hidden
      },
      start(sourceNode) {
        // fired when edgehandles interaction starts (drag on handle)
      },
      complete(sourceNode, targetNode, addedEles) {
        // fired when edgehandles is done and elements are added
      },
      stop(sourceNode) {
        // fired when edgehandles interaction is stopped (either complete with added edges or incomplete)
      },
      cancel(sourceNode, cancelledTargets) {
        // fired when edgehandles are cancelled (incomplete gesture)
      },
      hoverover(sourceNode, targetNode) {
        // fired when a target is hovered
      },
      hoverout(sourceNode, targetNode) {
        // fired when a target isn't hovered anymore
      },
      previewon(sourceNode, targetNode, previewEles) {
        // fired when preview is shown
      },
      previewoff(sourceNode, targetNode, previewEles) {
        // fired when preview is hidden
      },
      drawon() {
        // fired when draw mode enabled
      },
      drawoff() {
        // fired when draw mode disabled
      }
    }
  }),
  model: Immutable.from({
    // nodes: {
    //   'fae3763d-2cb9-4d54-9132-e34bc14f45f2': {
    //     label: 'Person A',
    //     type: NODE_TYPE_PERSON
    //   },
    //   '9a5cbd26-98d5-4057-977a-88f6d776542c': {
    //     label: 'Person B',
    //     type: NODE_TYPE_PERSON
    //   },
    //   'f00da641-6da9-4688-8763-9c4dac9d37eb': {
    //     label: 'Accountability 1',
    //     type: NODE_TYPE_ACCOUNTABILITY
    //   },
    //   'c8566db9-bf1f-45b0-b968-d79f22ce76c2': {
    //     label: 'Accountability 2',
    //     type: NODE_TYPE_ACCOUNTABILITY
    //   },
    //   '95c54d46-0f7b-49ba-96cb-e4a5b96734fc': {
    //     label: 'Accountability 3',
    //     type: NODE_TYPE_ACCOUNTABILITY
    //   }
    // },
    // edges: {
    //   '9a66d59d-65a3-4c78-8e97-a81c207942aa': {
    //     // 'A1'
    //     source: 'fae3763d-2cb9-4d54-9132-e34bc14f45f2',
    //     target: 'f00da641-6da9-4688-8763-9c4dac9d37eb',
    //     label: 'responsible'
    //   },
    //   'a47148ed-4ca9-49ed-81c0-5b913ba529ed': {
    //     // 'AB'
    //     source: 'fae3763d-2cb9-4d54-9132-e34bc14f45f2',
    //     target: '9a5cbd26-98d5-4057-977a-88f6d776542c'
    //   },
    //   'a4765819-018a-4e5e-b632-7a691e98993f': {
    //     // 'B2'
    //     source: '9a5cbd26-98d5-4057-977a-88f6d776542c',
    //     target: 'c8566db9-bf1f-45b0-b968-d79f22ce76c2'
    //   },
    //   '6a94e60a-9c0e-495f-8133-20384bd699b3': {
    //     // 'A3'
    //     source: 'fae3763d-2cb9-4d54-9132-e34bc14f45f2',
    //     target: '95c54d46-0f7b-49ba-96cb-e4a5b96734fc'
    //   },
    //   '69ff6993-355c-4547-be54-57e58a133770': {
    //     // 'B3'
    //     source: '9a5cbd26-98d5-4057-977a-88f6d776542c',
    //     target: '95c54d46-0f7b-49ba-96cb-e4a5b96734fc'
    //   }
    // }

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
