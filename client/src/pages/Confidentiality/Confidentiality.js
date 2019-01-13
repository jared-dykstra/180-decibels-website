import React from 'react'
import PropTypes from 'prop-types'

import { Template } from 'components'

import Sssh from './sssh-cropped.jpg'
import styles from './Confidentiality.module.scss'

const Confidentiality = ({ location }) => (
  <Template
    {...{
      title: '180 Decibels - Confidentiality',
      location
    }}
  >
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

Confidentiality.propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
  }).isRequired // <-- Passed down from react router
}

export default Confidentiality
