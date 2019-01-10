import React from 'react'
import PropTypes from 'prop-types'

// See: https://www.muicss.com/docs/v1/email/panel
const Panel = ({ children, style }) => (
  <table cellPadding="0" cellSpacing="0" border="0" width="100%">
    <tr>
      <td className="mui-panel" style={style}>
        {children}
      </td>
    </tr>
  </table>
)

Panel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  style: PropTypes.objectOf(PropTypes.string)
}

Panel.defaultProps = {
  style: undefined
}

export default Panel
