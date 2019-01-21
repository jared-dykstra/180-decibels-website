import { includes as _includes } from 'lodash'
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

// Cytoscape expects an array: [[selector: '', style: {}], ...]
export const graphStyleSelector = createSelector(
  vastSelector,
  selectedNodeTypesSelector,
  (vast, selectedNodeTypes) =>
    Object.entries(vast.graphStyle).map(([k, v]) => {
      const { nodeType, style } = v
      let newStyle = style
      if (nodeType) {
        const isSelected = _includes(selectedNodeTypes, nodeType)
        newStyle = style.setIn(['display'], isSelected ? undefined : 'none')
      }
      return {
        selector: k,
        style: newStyle
      }
    })
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
