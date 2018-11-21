import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'
import styles from './Intro.module.scss'

const Intro = ({ next }) => (
  <div>
    <h2>How loudly will each of the following questions resonate?</h2>
    <div className={`text-center ${styles['control-row']}`}>
      <h2>
        Set the volume for each question, or mute it if you feel it doesn&apos;t
        apply.
      </h2>
      <Button color="primary" onClick={next}>
        Start
      </Button>
    </div>
  </div>
)

Intro.propTypes = {
  next: PropTypes.func.isRequired
}

export default Intro
