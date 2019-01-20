import { createSelector } from 'reselect'

import { mountPoint } from '.'

const vastSelector = state => state[mountPoint]

export const graphSelector = createSelector(
  vastSelector,
  vast => vast.graph
)

export const prefsSelector = createSelector(
  vastSelector,
  vast => vast.prefs
)

export const selectedNodeTypesSelector = createSelector(
  prefsSelector,
  prefs => prefs.selectedNodeTypes
)

export const graphStyleSelector = createSelector(
  vastSelector,
  vast => vast.graphStyle
)

export const graphLayoutSelector = createSelector(
  vastSelector,
  vast => vast.graphLayout
)

const getNodesSelector = createSelector(
  vastSelector,
  vast => vast.nodes
)

export const getEdgesSelector = createSelector(
  vastSelector,
  vast => vast.edges
)

// NOTE: For filtering subsets of nodes, see: http://visjs.org/docs/data/dataview.html

// export const makeGetFilteredNodesSelector = () => {
//   console.log('JARED - makeGetFilteredNodesSelector')
//   return createSelector(
//     getNodesSelector,
//     prefsSelector,
//     (nodes, prefs) => {
//       console.log('JARED - getFilteredNodesSelector')

//       const view = vis.DataView(nodes, {
//         filter: item => {
//           const isInSelectedGroup = prefs.group
//             ? item.group === prefs.group
//             : true
//           console.log(
//             `item.id=${item.id} group=${item.group} selectedGroup=${
//               prefs.group
//             } isInSelectedGroup? ${isInSelectedGroup}`
//           )
//           return isInSelectedGroup
//         }
//       })

//       return view.get()
//     }
//   )
// }

export const makeGetFilteredNodesSelector = () => {
  console.log('JARED - makeGetFilteredNodesSelector')
  return createSelector(
    getNodesSelector,
    prefsSelector,
    (nodes, prefs) => {
      console.log('JARED - getFilteredNodesSelector')
      return nodes
    }
  )
}
