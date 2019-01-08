import React from 'react'
import PropTypes from 'prop-types'
import MuiEmailInlineCss from './MuiEmailInlineCss'
import MuiEmailStyleTag from './MuiEmailStyleTag'

/* eslint-disable react/no-danger */

const EmailTemplate = ({ children }) => (
  <html lang="en" xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width" />
      <MuiEmailStyleTag />
      <MuiEmailInlineCss />
      <style
        dangerouslySetInnerHTML={{
          __html: `
body,
.mui-body {
  background-color: #eee;
  font-size: 15px;
}

.mui-container,
.mui-container-fixed {
  padding-top: 15px;
  padding-bottom: 15px;
}`
        }}
      />
    </head>
    <body>
      <table className="mui-body" cellPadding="0" cellSpacing="0" border="0">
        <tr>
          <td>
            <center>
              {/* <!--[if mso]><table><tr><td class="mui-container-fixed"><![endif]--> */}
              <div className="mui-container">{children}</div>
              {/* <!--[if mso]></td></tr></table><![endif]--> */}
            </center>
          </td>
        </tr>
      </table>
    </body>
  </html>
)

EmailTemplate.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default EmailTemplate
