import fs from 'fs'
import React from 'react'
import ReactDOMServer from 'react-dom/server'

import { sendEmail } from '../sendEmail'

import EmailTemplate from '../components/EmailTemplate'
import AssessmentResultsEmail from '../messageTemplates/AssessmentResultsEmail'

// TODO: Change from integration test to unit test--this test requires a non-mocked database
it('renders HTML', async () => {
  const props = {
    resultsUrl: 'http://www.google.com',
    to: 'jared.dykstra@gmail.com'
  }

  const html = ReactDOMServer.renderToStaticMarkup(
    <AssessmentResultsEmail {...props} />
  )

  console.log(`HTML: ${html}`)
  fs.writeFileSync('./test.html', html)

  // const retval = await sendEmail({
  //   from: 'info@180decibels.com',
  //   to: 'jared.dykstra@180decibels.com',
  //   subject: 'Message',
  //   text: 'I hope this message gets sent!',
  //   html
  // })
})
