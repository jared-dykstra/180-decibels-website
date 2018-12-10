import React from 'react'
import { Col, Container, Nav, Navbar, NavItem, Row } from 'reactstrap'
import { Link } from 'react-router-dom'

import {
  ROUTE_CONFIDENTIALITY,
  ROUTE_HELP_ME,
  ROUTE_HELP_MY_TEAM,
  ROUTE_HOME,
  ROUTE_OUR_TEAM,
  ROUTE_PRIVACY,
  ROUTE_HOW_WE_WORK
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
              <Link to={ROUTE_HOME}>
                <b>What We Do</b>
              </Link>
            </NavItem>
            <ul>
              <NavItem>
                <Link to={ROUTE_HELP_ME}>Help Me</Link>
              </NavItem>
              <NavItem>
                <Link to={ROUTE_HELP_MY_TEAM}>Help My Team</Link>
              </NavItem>
              <NavItem>
                <Link to={ROUTE_HOW_WE_WORK}>How We Work</Link>
              </NavItem>
            </ul>
          </Nav>
        </Navbar>
      </Col>
      <Col xs="6" sm={{ size: '4' }}>
        <Navbar>
          <Nav vertical>
            <NavItem>
              <Link to={ROUTE_HOME}>
                <b>Who We Are</b>
              </Link>
            </NavItem>
            <ul>
              <NavItem>
                <Link to={ROUTE_OUR_TEAM}>Our Team</Link>
              </NavItem>
              <NavItem>
                <Link to={ROUTE_CONFIDENTIALITY}>Confidentiality</Link>
              </NavItem>
              <NavItem>
                <Link to={ROUTE_PRIVACY}>Privacy</Link>
              </NavItem>
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
