/*
  Wraps each page in a layout container, and header and footer
  An optional className prop can be specified, which is useful to scope modular sass
*/

import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'reactstrap'

import { Header, Footer } from '..'

const Template = ({ className, children }) => (
  <Container>
    <Header />
    <div className={className}>{children}</div>
    <Footer />
  </Container>
)

Template.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

Template.defaultProps = {
  className: undefined
}

export default Template
