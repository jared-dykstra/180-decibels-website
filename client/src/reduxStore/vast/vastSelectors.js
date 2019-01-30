import { createSelector } from 'reselect'

import { mountPoint } from '.'

const vastSelector = (state, props) => state[mountPoint]
const viewIdSelector = (state, props) => props.viewId

const viewsSelector = createSelector(
  vastSelector,
  vast => vast.views
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

export const graphSelector = createSelector(
  vastSelector,
  viewIdSelector,
  (vast, viewId) =>
    // console.log(`graphSelector viewId=${viewId}`)
    vast.graphs[viewId]
)

const currentViewSelector = createSelector(
  vastSelector,
  viewIdSelector,
  (vast, viewId) =>
    // console.log(`currentViewSelector viewId=${viewId}`)
    vast.views[viewId]
)

export const selectedNodeTypesSelector = createSelector(
  currentViewSelector,
  view => view.selectedNodeTypes
)

export const graphLayoutSelector = createSelector(
  currentViewSelector,
  view => view.layout
)
