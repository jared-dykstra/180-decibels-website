import { createSelector } from 'reselect'

import { mountPoint } from '.'

const vastSelector = state => state[mountPoint]

export const modelSelector = createSelector(
  vastSelector,
  vast => vast.model
)

export const viewsSelector = createSelector(
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

// Exposes enough information for the context menu
export const contextMenuDefaultsSelector = createSelector(
  vastSelector,
  vast => vast.defaults.ctxMenu
)

// Exposes enough information for the edgeHandles extension
export const edgeHandlesDefaultsSelector = createSelector(
  vastSelector,
  vast => vast.defaults.edgeHandles
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

export const editModeSelector = createSelector(
  activeViewSelector,
  view => (view ? view.editMode : false)
)
