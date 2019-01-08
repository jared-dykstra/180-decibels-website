import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'
import { connect } from 'react-redux'

import { initializedSelector } from 'reduxStore/selfAssessment/selfAssessmentSelectors'

import Heading from './Heading'

/* eslint-disable jsx-a11y/click-events-have-key-events */
const Intro = ({ isInitialized, next, tracker }) => (
  <div onClick={next} role="presentation" className="h-100">
    <Heading align="center">
      How loudly will each of the following questions resonate for your
      business?
    </Heading>
    <div className="text-center">
      {next && (
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={e => {
            const retval = next || e.stopPropagation()
            tracker.event({
              category: 'SelfAssessment',
              action: 'Begin'
            })
            return retval
          }}
          style={{ marginTop: '3rem' }}
          disabled={!isInitialized}
        >
          Okay, Let&apos;s begin
        </Button>
      )}
    </div>
  </div>
)

Intro.propTypes = {
  next: PropTypes.func,
  // assessmentName is used via initializedSelector
  // eslint-disable-next-line react/no-unused-prop-types
  assessmentName: PropTypes.string.isRequired,
  isInitialized: PropTypes.bool.isRequired,
  tracker: PropTypes.shape({
    event: PropTypes.func.isRequired
  }).isRequired
}

Intro.defaultProps = {
  next: undefined
}

export default connect((state, { assessmentName }) => ({
  isInitialized: initializedSelector(state, { assessmentName })
}))(Intro)
