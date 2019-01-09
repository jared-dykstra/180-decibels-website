import React from 'react'
import ReactDOMServer from 'react-dom/server'

import AssessmentResultsEmail, {
  getText
} from './messageTemplates/AssessmentResultsEmail'
import { banner } from './components/cids'

import { sendEmail } from './sendEmail'

export const sendAssessmentResultsEmail = async ({ resultsUrl, email }) => {
  const text = getText({ resultsUrl })
  const html = ReactDOMServer.renderToStaticMarkup(
    <AssessmentResultsEmail {...{ resultsUrl, to: email }} />
  )

  const attachments = [banner]

  await sendEmail({
    from: '180 Decibels <info@180decibels.com>',
    to: email,
    subject: 'How to Improve Productivity and Reduce Costs',
    text,
    html,
    attachments
  })
}
