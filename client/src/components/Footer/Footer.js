import React from 'react'
import { Container, Nav, Navbar } from 'reactstrap'

import { SocialLinks } from 'components'

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
      <Nav>
        <a href="mailto:info@180decibels.com">info@180decibels.com</a>
      </Nav>
      <Nav>
        <SocialLinks />
      </Nav>
      <a href="tel:+18883214531">1-888-321-4531</a>
    </Container>
  </Navbar>
]
