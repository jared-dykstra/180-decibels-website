import React from 'react'

import { Quote, SelfAssessment, Template } from 'components'

import styles from './HelpMyTeam.module.scss'

export default () => (
  <Template>
    <h1>Help My Team</h1>
    <p className="lead">
      We re-focus managers on driving to outcome and on creating urgency. We
      offer a practical, results-oriented process to build a high-performing
      culture so you can start feeling more competent and more confident and see
      huge productivity gains from your team.
    </p>
    <p>
      Maybe your company grew very quickly or maybe you have people in seats
      that were never trained to manage…that is all very normal. But an
      undirected team operates naturally in survival mode which quickly leads to
      overwhelm. Without clear accountability and day-to-day discipline, teams
      get bogged down and performance suffers (along with morale).
    </p>
    <Quote cite="Patrick, Technical Lead" className={styles.quote}>
      I have much more confidence and feel like I am achieving something in a
      day. I have a tonne more motivation to work on what I am supposed to be
      working on.
    </Quote>
    <p>
      <b>It only takes one minute to get results you can use.</b> Use this
      self-assessment to understand your situation. These questions are enough
      to create an initial report, which will contain concrete, actionable steps
      that you can immediately use.
    </p>
    <SelfAssessment assessmentName="helpMyTeam" />
  </Template>
)
