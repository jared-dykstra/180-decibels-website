import React from 'react'
import { Helmet } from 'react-helmet'

import { Template } from 'components'

import Sssh from './sssh-cropped.jpg'
import styles from './Confidentiality.module.scss'

export default () => (
  <Template>
    <Helmet>
      <title>180 Decibels - Confidentiality</title>
      <meta name="description" content="Your business is Your business" />
    </Helmet>
    <img
      src={Sssh}
      alt="sssh"
      className={`rounded-circle img-thumbnail img-fluid mx-auto d-block w-50 ${
        styles.sssh
      }`}
    />
    <h1 className="text-center">180 Decibels</h1>
    <h1 className="text-center">
      <small className="text-muted">Confidentiality</small>
    </h1>
    <p className="text-center">
      We know that for our work to be successful, we need to get under the
      covers of your company. This means we often come across sensitive
      information. We are bound by a strict confidentiality pact that ensures
      our clients are to free to openly discuss personal and company
      information.
    </p>
    <p className="text-center">
      <b>Your business is Your business.</b>
    </p>
  </Template>
)
