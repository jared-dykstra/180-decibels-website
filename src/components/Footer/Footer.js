import React from 'react'
import { Container, Navbar } from 'reactstrap'

import styles from './Footer.module.scss'

export default () => [
  <div key="footer-spacing" className={styles['footer-spacing']} />,
  <Navbar
    key="footer"
    color="faded"
    light
    className={`fixed-bottom ${styles.footer}`}
  >
    <Container>
      <a href="mailto:info@180decibels.com">info@180decibels.com</a>
      <a href="tel:+18883214531">1-888-321-4531</a>
    </Container>
  </Navbar>
]
