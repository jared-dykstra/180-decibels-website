import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'

import Heading from './Heading'

/* eslint-disable jsx-a11y/click-events-have-key-events */
const Intro = ({ next }) => (
  <div onClick={next} role="presentation" className="h-100">
    <Heading align="center">
      How loudly will each of the following questions resonate for your
      business?
    </Heading>
    <div className="text-center">
      {next && (
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={e => next || e.stopPropagation()}
          style={{ marginTop: '3rem' }}
        >
          Okay, Let&apos;s begin
        </Button>
      )}
    </div>
  </div>
)

Intro.propTypes = {
  next: PropTypes.func
}

Intro.defaultProps = {
  next: undefined
}

export default Intro
