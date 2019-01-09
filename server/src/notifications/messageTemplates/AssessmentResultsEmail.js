import React from 'react'
import PropTypes from 'prop-types'

import EmailTemplate from '../components/EmailTemplate'
import Button from '../components/Button'

/* See: https://www.muicss.com/docs/v1/email/boilerplate-html */
const AssessmentResultEmail = ({ to, resultsUrl }) => (
  <EmailTemplate {...{ to }}>
    <p style={{ marginTop: '1em' }}>
      Congratulations! You&apos;re on your way towards improving productivity
      and reducing costs
    </p>
    <div style={{ marginTop: '40px', marginBottom: '40px' }}>
      <center>
        <Button raised href={resultsUrl} color="primary">
          Click to See how you&apos;re doing
        </Button>
      </center>
    </div>
    <p />
    <p>
      Or use the following link to access to your results--and tips on how to
      improve:
    </p>
    <a href={resultsUrl}>{resultsUrl}</a>
    <hr style={{ marginTop: '30px' }} />
    <p className="mui--text-dark-secondary">
      Take the survey again any time:{' '}
      <a href="https://180decibels.com">www.180Decibels.com</a>
    </p>
  </EmailTemplate>
)

EmailTemplate.propTypes = {
  to: PropTypes.string.isRequired
}

export default AssessmentResultEmail
