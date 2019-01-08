import React from 'react'
import PropTypes from 'prop-types'

const Panel = ({ children }) => (
  <table cellPadding="0" cellSpacing="0" border="0" width="100%">
    <tr>
      <td className="mui-panel">{children}</td>
    </tr>
  </table>
)

Panel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default Panel
