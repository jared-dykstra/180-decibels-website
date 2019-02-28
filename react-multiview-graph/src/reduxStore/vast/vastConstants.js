// Actions affecting ui state
export const SET_SELECTED_NODE_TYPES = 'vast/set-selected-node-types'

// Actions affecting contents of the graph
export const CREATE_VIEW = 'vast/create-view'
export const DELETE_VIEW = 'vast/delete-view'
export const SET_ACTIVE_VIEW = 'vast/set-active-view'
export const LAYOUT = 'vast/layout'
export const SELECT_NODE = 'vast/select-node'
export const EDIT_NODE = 'vast/edit-node'
export const SHOW_CONNECTIONS = 'vast/show-connections'
export const TOGGLE_EDIT_MODE = 'vast/toggle-edit-mode'
export const ADD_CONNECTION = 'vast/add-connection'
export const ADD_NODE = 'vast/add-node'

// Node Types
export const NODE_TYPE_PERSON = 'person'
export const NODE_TYPE_ORG_UNIT = 'orgUnit'
export const NODE_TYPE_ACCOUNTABILITY = 'accountability'
export const NODE_TYPE_PRIORITY = 'priority'
export const NODE_TYPE_CORE_VALUES = 'coreValue'
export const NODE_TYPE_METRIC = 'metric'

// Node Data
export const NODE_DATA_ORG_POS = 'orgPos'

// Classes
export const CLASS_PERSON = `cls_${NODE_TYPE_PERSON}`
export const CLASS_ACCOUNTABILITY = `cls_${NODE_TYPE_ACCOUNTABILITY}`
export const CLASS_PRIORITY = `cls_${NODE_TYPE_PRIORITY}`
export const CLASS_CORE_VALUE = `cls_${NODE_TYPE_CORE_VALUES}`
export const CLASS_METRIC = `cls_${NODE_TYPE_METRIC}`
export const CLASS_ORG_UNIT = `cls_${NODE_TYPE_ORG_UNIT}`
export const CLASS_NEW = 'cls_new'
export const CLASS_HIDDEN = 'cls_hidden'
export const CLASS_HIGHLIGHTED = 'highlighted'
export const CLASS_FADED = 'faded'

// Colors come from here: https://coolors.co/617881-77c0b7-e9c46a-f4a261-e76f51
export const NODE_TYPE_CLASS_MAP = {
  [NODE_TYPE_PERSON]: {
    color: '#777777',
    className: CLASS_PERSON,
    secondaryDimension: [],
    rank: 4
  },
  [NODE_TYPE_ORG_UNIT]: {
    color: '#617881',
    className: CLASS_ORG_UNIT,
    secondaryDimension: [NODE_TYPE_ACCOUNTABILITY],
    rank: 2
  },
  [NODE_TYPE_ACCOUNTABILITY]: {
    color: '#77C0B7',
    className: CLASS_ACCOUNTABILITY,
    secondaryDimension: [NODE_TYPE_PERSON],
    rank: 3
  },
  [NODE_TYPE_PRIORITY]: {
    color: '#E9C46A',
    className: CLASS_PRIORITY,
    secondaryDimension: [NODE_TYPE_PERSON],
    rank: 2
  },
  [NODE_TYPE_CORE_VALUES]: {
    color: '#F4A261',
    className: CLASS_CORE_VALUE,
    secondaryDimension: [NODE_TYPE_PERSON],
    rank: 5
  },
  [NODE_TYPE_METRIC]: {
    color: '#E76F51',
    className: CLASS_METRIC,
    secondaryDimension: [NODE_TYPE_PERSON],
    rank: 1
  }
}
