import React from 'react'
import PropTypes from 'prop-types'

import EmailTemplate from '../components/EmailTemplate'
import Panel from '../components/Panel'

/* See: https://www.muicss.com/docs/v1/email/boilerplate-html */
const AssessmentResultEmail = ({ to }) => (
  <EmailTemplate {...{ to }}>
    <Panel>
      <h1>Heading 1 - W00t</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <h5>Heading 5</h5>
      <hr />
      <p>Paragraph 1</p>
      <p>Paragraph 2</p>
      <p>Paragraph 3</p>
      <div>
        <strong>Strong</strong>
      </div>
      <div>
        <em>Emphasis</em>
      </div>
      <div>
        <a href="#" className="mui-btn">
          Button
        </a>
        <a href="#" className="mui-btn mui-btn--primary">
          Button
        </a>
        <a href="#" className="mui-btn mui-btn--danger">
          Button
        </a>
        <a href="#" className="mui-btn mui-btn--accent">
          Button
        </a>
      </div>
    </Panel>
  </EmailTemplate>
)

EmailTemplate.propTypes = {
  to: PropTypes.string.isRequired
}

export default AssessmentResultEmail
