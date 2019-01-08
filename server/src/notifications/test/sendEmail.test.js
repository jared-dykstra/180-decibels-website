import fs from 'fs'
import React from 'react'
import ReactDOMServer from 'react-dom/server'

import { sendEmail } from '../sendEmail'

import EmailTemplate from '../EmailTemplate'
import AssessmentResultsEmail from '../AssessmentResultsEmail'

// TODO: Change from integration test to unit test--this test requires a non-mocked database
it.skip('renders HTML', async () => {
  const props = {
    resultsUrl: 'http://www.google.com',
    resultsEmail: 'jared.dykstra@gmail.com'
  }

  const html = ReactDOMServer.renderToStaticMarkup(
    <EmailTemplate>
      <AssessmentResultsEmail {...props} />
    </EmailTemplate>
  )

  console.log(`HTML: ${html}`)
  fs.writeFileSync('./test.html', html)

  const retval = await sendEmail({
    from: 'info@180decibels.com',
    to: 'jared.dykstra@180decibels.com',
    subject: 'Message',
    text: 'I hope this message gets sent!',
    html
  })
})
