import React from 'react'
import { Col, Container, Nav, Navbar, NavItem, Row } from 'reactstrap'
import { Link } from 'react-router-dom'

import {
  ROUTE_HELP_ME,
  ROUTE_HELP_MY_TEAM,
  ROUTE_OUR_TEAM
} from 'redux/routes/routesConstants'
import { SocialLinks } from 'components'

import styles from './Footer.module.scss'

export default () => [
  <div key="footer-spacing" className={styles['footer-spacing']} />,
  <Container key="footer" fluid className={styles.footer}>
    <Row className={styles['site-map']}>
      <Col xs="6" sm={{ size: '4', offset: '2' }}>
        <Navbar>
          <Nav vertical>
            <NavItem>
              <b>What We Do</b>
            </NavItem>
            <ul>
              <NavItem>
                <Link to={ROUTE_HELP_ME}>Help Me</Link>
              </NavItem>
              <NavItem>
                <Link to={ROUTE_HELP_MY_TEAM}>Help My Team</Link>
              </NavItem>
            </ul>
          </Nav>
        </Navbar>
      </Col>
      <Col xs="6" sm={{ size: '4' }}>
        <Navbar>
          <Nav vertical>
            <NavItem>
              <b>Who We Are</b>
            </NavItem>
            <ul>
              <NavItem>Why Us</NavItem>
              <NavItem>How We Work</NavItem>
              <NavItem>
                <Link to={ROUTE_OUR_TEAM}>Our Team</Link>
              </NavItem>
              <NavItem>Confidentiality</NavItem>
            </ul>
          </Nav>
        </Navbar>
      </Col>
    </Row>
    <hr />
    <Row className={styles.bottom}>
      <Col>
        <Navbar>
          <Nav>
            <a href="mailto:info@180decibels.com" className="text-nowrap">
              info@180decibels.com
            </a>
          </Nav>
          <Nav>
            <SocialLinks />
          </Nav>
          <a href="tel:+18883214531" className="text-nowrap">
            1-888-321-4531
          </a>
        </Navbar>
      </Col>
    </Row>
  </Container>
]
