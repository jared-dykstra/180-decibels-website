import React from 'react'
import { connect } from 'react-redux'
import { questionListSelector } from '../../redux/selfAssessment/selfAssessmentSelectors'

import { SelfAssessment, Template } from '../../components'
import { questionsPropType } from '../../propTypes'

const HelpMe = ({ questions }) => (
  <Template>
    <h1>Help Me</h1>
    <p>
      <i>Situational Awareness...</i>
    </p>
    <p>
      Use this self-assessment to understand your situation. It only takes one
      minute to get concrete next steps.
    </p>
    <p>
      These questions are enough to create an initial report, which will contain
      concrete, actionable steps that you can immediately use.
    </p>
    <SelfAssessment questions={questions} />
  </Template>
)

HelpMe.propTypes = {
  questions: questionsPropType.isRequired
}

export default connect(state => ({
  questions: questionListSelector(state)
}))(HelpMe)
