import { createSelector } from 'reselect'

import { mountPoint } from '.'

const vastSelector = state => state[mountPoint]

const viewsSelector = createSelector(
  vastSelector,
  vast => vast.views
)

export const activeViewIdSelector = createSelector(
  vastSelector,
  vast => vast.viewer.activeView
)

// Exposes a limited amount of data--enough to generate list of tabs
export const viewListSelector = createSelector(
  viewsSelector,
  views => {
    const list = Object.entries(views).map(([id, view]) => ({
      id,
      name: view.name
    }))
    return list
  }
)

export const graphsSelector = createSelector(
  vastSelector,
  vast => vast.graphs
)

export const graphSelector = createSelector(
  vastSelector,
  activeViewIdSelector,
  (vast, viewId) =>
    // console.log(`graphSelector viewId=${viewId}`)
    vast.graphs[viewId]
)

const activeViewSelector = createSelector(
  vastSelector,
  activeViewIdSelector,
  (vast, viewId) =>
    // console.log(`currentViewSelector viewId=${viewId}`)
    vast.views[viewId]
)

export const selectedNodeTypesSelector = createSelector(
  activeViewSelector,
  view => (view ? view.selectedNodeTypes : [])
)

export const graphLayoutSelector = createSelector(
  activeViewSelector,
  view => view.layout
)
