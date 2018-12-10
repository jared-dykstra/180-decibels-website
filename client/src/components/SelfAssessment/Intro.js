import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'
import styles from './Intro.module.scss'

/* eslint-disable jsx-a11y/click-events-have-key-events */
const Intro = ({ next }) => (
  <div onClick={next} role="presentation" className="h-100">
    <h2>
      How loudly will each of the following questions resonate for your
      business?
    </h2>
    <div className={`text-center ${styles['control-row']}`}>
      <Button
        size="lg"
        color="primary"
        onClick={e => next || e.stopPropagation()}
      >
        Okay, Let&apos;s begin
      </Button>
    </div>
  </div>
)

Intro.propTypes = {
  next: PropTypes.func.isRequired
}

export default Intro
