import PropTypes from 'prop-types'

export const questionsPropType = PropTypes.arrayOf(
  PropTypes.shape({ id: PropTypes.string, text: PropTypes.string })
)

// hash object, with question ids as keys
export const responsesPropType = PropTypes.object
