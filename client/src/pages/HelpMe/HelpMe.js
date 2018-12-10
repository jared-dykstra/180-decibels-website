import React from 'react'

import { Quote, SelfAssessment, Template } from 'components'

import styles from './HelpMe.module.scss'

export default () => (
  <Template>
    <h1>Help Me</h1>
    <p className="lead">
      We generate real ROI and substantially grow confidence team&apos;s ability
      to execute.
    </p>
    <Quote cite="John, Executive Director" className={styles.quote}>
      “My very first sit down with 180Decibels was eye opening, to say the
      least. From the first few questions I knew that I had much to discover and
      was about to enter a learning cycle that would take me to a great future.
      I am discovering new aspects of myself and how I can cooperate and lead my
      team.”
    </Quote>
    <p>
      We let you set the direction while we saturate your organization with a
      proven process for getting where you want to go. Our mission is to
      measurably improve team productivity with tactical operational tools and
      processes.
    </p>
    <p>
      <b>It only takes one minute to get results you can use.</b> Use this
      self-assessment to understand your situation. These questions are enough
      to create an initial report, which will contain concrete, actionable steps
      that you can immediately use.
    </p>
    <SelfAssessment assessmentName="helpMe" />
  </Template>
)
