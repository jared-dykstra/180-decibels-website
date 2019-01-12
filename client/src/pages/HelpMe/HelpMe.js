import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'reactstrap'

import { Quote, SelfAssessment, Template } from 'components'

import styles from './HelpMe.module.scss'

const HelpMe = ({ location, ...props }) => (
  <Template
    {...{
      title: '180 Decibels - Help Me',
      description:
        'We re-focus managers: driving to outcomes and creating urgency',
      location,
      locationHashOverride: '#quiz',
      className: styles['help-me']
    }}
  >
    <Row>
      <Col md={{ size: 10, offset: 1 }}>
        <h1>Help Me</h1>

        <p className="lead">
          We re-focus managers: driving to outcomes and creating urgency.
        </p>
        <p>
          We offer a practical, results-oriented process to build a
          high-performing culture so you can start feeling more competent and
          more confident and see huge productivity gains from your team.
        </p>
        <Quote cite="Patrick, Technical Lead" className={styles.quote}>
          I have much more confidence and feel like I am achieving something in
          a day. I have a tonne more motivation to work on what I am supposed to
          be working on.
        </Quote>
        <p>
          <b>It only takes one minute to get results you can use.</b> Use this
          self-assessment to understand your situation. These questions are
          enough to create an initial report, which will contain concrete,
          actionable steps that you can immediately use.
        </p>
        <SelfAssessment assessmentName="helpMe" id="quiz" {...props} />
        <p>
          Maybe your company grew very quickly or maybe you have people in seats
          that were never trained to manage…that is all very normal. But an
          undirected team operates naturally in survival mode which quickly
          leads to overwhelm. Without clear accountability and day-to-day
          discipline, teams get bogged down and performance suffers (along with
          morale).
        </p>
      </Col>
    </Row>
  </Template>
)

HelpMe.propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
  }).isRequired // <-- Passed down from react router
}

export default HelpMe
