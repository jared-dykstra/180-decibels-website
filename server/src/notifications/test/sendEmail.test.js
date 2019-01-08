import React from 'react'
import ReactDOMServer from 'react-dom/server'

import { sendEmail } from '../sendEmail'

import ReactContainer from '../ReactContainer'
import Panel from '../../../../client/src/components/SelfAssessment/ResultsEmail'

// TODO: Change from integration test to unit test--this test requires a non-mocked database
// it('sends an email', async () => {
//   const retval = await sendEmail()
// })

it('renders HTML', async () => {
  const props = {
    resultsUrl: 'http://www.google.com',
    resultsEmail: 'jared.dykstra@gmail.com'
  }

  const html = ReactDOMServer.renderToStaticMarkup(
    <ReactContainer>
      <Panel {...props} />
    </ReactContainer>
  )

  console.log(`HTML: ${html}`)

  const retval = await sendEmail({
    from: 'info@180decibels.com',
    to: 'jared.dykstra@180decibels.com',
    subject: 'Message',
    text: 'I hope this message gets sent!',
    html
  })
})
