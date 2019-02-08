// Actions affecting ui state
export const SET_SELECTED_NODE_TYPES = 'vast/set-selected-node-types'

// Actions affecting contents of the graph
export const CREATE_VIEW = 'vast/create-view'
export const DELETE_VIEW = 'vast/delete-view'
export const SET_ACTIVE_VIEW = 'vast/set-active-view'
export const LAYOUT = 'vast/layout'
export const SHOW_CONNECTIONS = 'vast/show-connections'
export const ADD_CONNECTION = 'vast/add-connection'
export const ADD_NODE = 'vast/add-node'

// Node Types
export const NODE_TYPE_PERSON = 'person'
export const NODE_TYPE_ORG_UNIT = 'orgUnit'
export const NODE_TYPE_ACCOUNTABILITY = 'accountability'
export const NODE_TYPE_PRIORITY = 'priority'
export const NODE_TYPE_CORE_VALUES = 'coreValue'
export const NODE_TYPE_METRIC = 'metric'

// Classes
export const CLASS_PERSON = `cls_${NODE_TYPE_PERSON}`
export const CLASS_ACCOUNTABILITY = `cls_${NODE_TYPE_ACCOUNTABILITY}`
export const CLASS_PRIORITY = `cls_${NODE_TYPE_PRIORITY}`
export const CLASS_HIDDEN = 'cls_hidden'
export const CLASS_CORE_VALUE = 'cls_coreValue'
export const CLASS_METRIC = 'cls_metric'
export const CLASS_ORG_UNIT = 'cls_orgUnit'
export const CLASS_NEW = 'cls_new'

// Colors come from here: https://coolors.co/617881-77c0b7-e9c46a-f4a261-e76f51
export const NODE_TYPE_CLASS_MAP = {
  [NODE_TYPE_PERSON]: {
    color: '#777777',
    className: CLASS_PERSON,
    secondaryDimension: []
  },
  [NODE_TYPE_ORG_UNIT]: {
    color: '#617881',
    className: CLASS_ORG_UNIT,
    secondaryDimension: [NODE_TYPE_ACCOUNTABILITY]
  },
  [NODE_TYPE_ACCOUNTABILITY]: {
    color: '#77C0B7',
    className: CLASS_ACCOUNTABILITY,
    secondaryDimension: [NODE_TYPE_PERSON]
  },
  [NODE_TYPE_PRIORITY]: {
    color: '#E9C46A',
    className: CLASS_PRIORITY,
    secondaryDimension: [NODE_TYPE_PERSON]
  },
  [NODE_TYPE_CORE_VALUES]: {
    color: '#F4A261',
    className: CLASS_CORE_VALUE,
    secondaryDimension: [NODE_TYPE_PERSON]
  },
  [NODE_TYPE_METRIC]: {
    color: '#E76F51',
    className: CLASS_METRIC,
    secondaryDimension: [NODE_TYPE_PERSON]
  }
}
