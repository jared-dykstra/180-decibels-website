/*
  Wraps each page in a layout container, and header and footer
  An optional className prop can be specified, which is useful to scope modular sass
*/

import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'reactstrap'
import Helmet from 'react-helmet'

import { Header, Footer } from 'components'
import { get as configGet } from '../../config'

import styles from './template.module.scss'

const Template = ({
  title,
  description,
  location,
  locationHashOverride,
  imageUrl,
  type,
  twitterCardType,
  twitterCreator,
  className,
  children
}) => {
  const rootUrl = configGet('rootUrl')
  // location.hash and location.search will always be blank when the page is pre-rendered since
  // meta tags can only be used when the page is pre-rendered with `react-snap`, `og:url` will never
  // include a hash or search query string unless `locationHashOverride` is set.  It can only be set
  // once-per-page, and must be a static string.  Changing it on the client-side will have no effect
  const { pathname, hash: originalHash, search } = location
  const hash = originalHash || locationHashOverride
  const url = `${rootUrl}${pathname}${
    search && search.length > 0 ? search : ''
  }${hash && hash.length > 0 ? hash : ''}`
  return [
    <Container key="container" className={styles.page}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:url" content={url} />,
        <meta property="og:title" content={title} />,
        <meta property="og:description" content={description} />,
        <meta property="og:image" content={imageUrl} />,
        <meta property="og:type" content={type} />,
        <meta name="twitter:card" content={twitterCardType} />,
        <meta name="twitter:creator" content={twitterCreator} />
      </Helmet>
      <Header />
      <div className={className}>{children}</div>
    </Container>,
    <Footer key="footer" />
  ]
}

Template.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  location: PropTypes.shape({
    hash: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
  }).isRequired, // <-- Passed down from react router
  locationHashOverride: PropTypes.string,
  type: PropTypes.string,
  twitterCardType: PropTypes.oneOf([
    'summary',
    'summary_large_image',
    'app',
    'player'
  ]),
  twitterCreator: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

Template.defaultProps = {
  title: '180 Decibels',
  description:
    'Removing the Complexity from Managing your Team.  Our mission is to measurably improve team productivity with tactical operational tools and processes.',
  imageUrl: 'https://www.180decibels.com/180-Decibels.png',
  type: 'website',
  twitterCardType: 'summary_large_image',
  twitterCreator: '1Decibels',
  locationHashOverride: undefined,
  className: undefined
}

export default Template
