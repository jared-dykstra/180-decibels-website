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
export const NODE_TYPE_ACCOUNTABILITY = 'accountability'
export const NODE_TYPE_PRIORITY = 'priority'

// Classes
export const CLASS_PERSON = `cls_${NODE_TYPE_PERSON}`
export const CLASS_ACCOUNTABILITY = `cls_${NODE_TYPE_ACCOUNTABILITY}`
export const CLASS_PRIORITY = `cls_${NODE_TYPE_PRIORITY}`
export const CLASS_HIDDEN = 'cls_hidden'

export const NODE_TYPE_CLASS_MAP = {
  [NODE_TYPE_PERSON]: CLASS_PERSON,
  [NODE_TYPE_ACCOUNTABILITY]: CLASS_ACCOUNTABILITY,
  [NODE_TYPE_PRIORITY]: CLASS_PRIORITY
}
