import React from 'react'

import { SelfAssessment, Template } from '../../components'

export default () => (
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
      How loudly does each question resonate with you? Set the volume knob for
      each question, or mute it if you feel it doesn&apos;t apply.
    </p>
    <p>
      These questions are enough to create an initial report, which will contain
      concrete, actionable steps that you can immediately use.
    </p>
    <SelfAssessment />
  </Template>
)
