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

export const graphLayoutSelector = createSelector(
  vastSelector,
  vast => vast.graphLayout
)

// export const getNodesSelector = createSelector(
//   vastSelector,
//   vast => vast.nodes
// )

// export const getEdgesSelector = createSelector(
//   vastSelector,
//   vast => vast.edges
// )
