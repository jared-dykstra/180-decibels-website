import React from 'react'
import { Col, Container, Nav, Navbar, NavItem, Row } from 'reactstrap'

import { SocialLinks } from 'components'

import styles from './Footer.module.scss'

export default () => [
  <div key="footer-spacing" className={styles['footer-spacing']} />,
  <Container fluid className={`${styles.footer}`}>
    <Row>
      <Col sm={{ size: '4', offset: '2' }}>
        <Navbar>
          <Nav vertical>
            <NavItem>About</NavItem>
            <ul>
              <NavItem>Why Us</NavItem>
              <NavItem>How We Work</NavItem>
              <NavItem>Our Team</NavItem>
              <NavItem>Confidentiality</NavItem>
            </ul>
          </Nav>
        </Navbar>
      </Col>
      <Col sm={{ size: '4' }}>
        <Navbar>
          <Nav vertical>
            <NavItem>Company</NavItem>
            <ul>
              <NavItem>Why Us</NavItem>
              <NavItem>How We Work</NavItem>
              <NavItem>Our Team</NavItem>
              <NavItem>Confidentiality</NavItem>
            </ul>
          </Nav>
        </Navbar>
      </Col>
    </Row>
    <Row>
      <Col>
        <Navbar>
          <Nav>
            <a href="mailto:info@180decibels.com">info@180decibels.com</a>
          </Nav>
          <Nav>
            <SocialLinks />
          </Nav>
          <a href="tel:+18883214531">1-888-321-4531</a>
        </Navbar>
      </Col>
    </Row>
  </Container>
]
