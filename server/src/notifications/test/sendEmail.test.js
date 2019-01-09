import fs from 'fs'
import React from 'react'
import ReactDOMServer from 'react-dom/server'

import AssessmentResultsEmail from '../messageTemplates/AssessmentResultsEmail'
import { sendEmail } from '../sendEmail'
import { banner } from '../components/cids'

// TODO: Change from integration test to unit test--this test requires a non-mocked database
it.skip('renders HTML', async () => {
  const props = {
    resultsUrl: 'http://www.google.com',
    to: 'jared.dykstra@gmail.com'
  }

  const html = ReactDOMServer.renderToStaticMarkup(
    <AssessmentResultsEmail {...props} />
  )

  fs.writeFileSync('./test.html', html)

  const attachments = [banner]

  console.log(`PATH=${banner.path}`)

  await sendEmail({
    from: 'info@180decibels.com',
    to: 'jared.dykstra@180decibels.com',
    subject: 'Message',
    text: 'I hope this message gets sent!',
    html,
    attachments
  })
})
