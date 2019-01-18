import { createSelector } from 'reselect'
import { mountPoint } from '.'

const vastSelector = state => state[mountPoint]

export const getNodesSelector = createSelector(
  vastSelector,
  vast => vast.nodes
)

export const getEdgesSelector = createSelector(
  vastSelector,
  vast => vast.edges
)

// NOTE: For filtering subsets of nodes, see: http://visjs.org/docs/data/dataview.html
