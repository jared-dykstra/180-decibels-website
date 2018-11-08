import React from 'react'
import { Container, Navbar } from 'reactstrap'

import './Footer.scss'

export default () => (
  <Navbar color="faded" light className="fixed-bottom footer">
    <Container>
      <a href="mailto:info@180decibels.com">info@180decibels.com</a>
      <a href="tel:+18883214531">1-888-321-4531</a>
    </Container>
  </Navbar>
)
