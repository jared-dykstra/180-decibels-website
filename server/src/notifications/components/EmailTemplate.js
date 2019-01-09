import path from 'path'
import React from 'react'
import PropTypes from 'prop-types'
import InlineCss from './InlineCss'

/* eslint-disable react/no-danger */

const EmailTemplate = ({ children, to }) => (
  <html lang="en" xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width" />
      <InlineCss file={path.resolve(__dirname, '../style/emailStyleTag.css')} />
      <InlineCss
        file={path.resolve(__dirname, '../style/emailInlineCss.css')}
      />
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
              <div className="mui-container">
                {children}
                <hr />
                <div className="mui--text-dark-hint">
                  <small>
                    <p>
                      You are receiving this email because {to} is signed up to
                      receive emails from{' '}
                      <a
                        href="https://180decibels.com"
                        className="mui--text-dark-hint"
                      >
                        180 Decibels Inc.
                      </a>
                      , and its related companies and affiliates.
                    </p>
                    <p>
                      This email was sent by:{' '}
                      <a
                        href="https://180decibels.com"
                        className="mui--text-dark-hint"
                      >
                        180 Decibels Inc.
                      </a>
                    </p>
                    <p>
                      To stop receiving 180 Decibels communications, please{' '}
                      <a
                        href="mailto:info@180decibels.com?subject=Unsubscribe"
                        className="mui--text-dark-hint"
                      >
                        click to unsubscribe
                      </a>
                    </p>
                  </small>
                </div>
              </div>
              {/* <!--[if mso]></td></tr></table><![endif]--> */}
            </center>
          </td>
        </tr>
      </table>
    </body>
  </html>
)

EmailTemplate.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default EmailTemplate
