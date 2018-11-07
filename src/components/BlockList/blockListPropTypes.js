import propTypes from 'prop-types'

export const blockPropType = propTypes.shape({
  // Minimal set of properties expected by the rendering code.  There are more
  id: propTypes.string,
  timestamp: propTypes.string,
  transactions: propTypes.arrayOf(propTypes.object)
})
export const blockListPropType = propTypes.arrayOf(blockPropType)
