import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Col, Navbar } from 'reactstrap'

import { GetStarted, LogInModal, Logo } from 'components'
import { isHomePageSelector } from 'redux/routes/routesSelectors'
import { ROUTE_HOME } from 'redux/routes/routesConstants'

import styles from './Header.module.scss'

class Header extends PureComponent {
  static propTypes = {
    isHomePage: PropTypes.bool.isRequired
  }

  render() {
    const { isHomePage } = this.props

    return (
      <Navbar color="faded" light expand="md" className={styles.header}>
        <Col xs="6" md="4" className={styles.brand}>
          <span className="text-nowrap">
            <Link className={styles['mini-brand']} to={ROUTE_HOME}>
              <Logo /> 180 Decibels
            </Link>
          </span>
        </Col>
        <Col xs="6" md="3" className={styles.tel}>
          <a className="text-nowrap float-right" href="tel:+18883214531">
            1-888-321-4531
          </a>
        </Col>
        <Col
          xs={{ size: 12, offset: 0 }}
          md={{ size: 5, offset: 0 }}
          className={styles.buttons}
        >
          <span className="float-right">
            <LogInModal />
            {!isHomePage && (
              <span>
                &nbsp;&nbsp;<GetStarted>Get Started</GetStarted>
              </span>
            )}
          </span>
        </Col>
      </Navbar>
    )
  }
}

export default connect(state => ({
  isHomePage: isHomePageSelector(state)
}))(Header)
