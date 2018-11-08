/*
  Wraps each page in a layout container, and header and footer
*/

import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'reactstrap'

import { Header, Footer } from '..'

const Template = ({ children }) => (
  <Container>
    <Header />
    {children}
    <Footer />
  </Container>
)

Template.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default Template
