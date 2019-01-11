import React from 'react'
import PropTypes from 'prop-types'

// TODO: Consolidate page title and descriptions as properties of Template
// TODO: Include this via Template like this: https://github.com/nfl/react-helmet/issues/342#issuecomment-399545315

const OpenGraph = ({
  title,
  description,
  image,
  url,
  type,
  twitterCardType,
  twitterCreator
}) => (
  <React.Fragment>
    {url && <meta property="og:url" content={url} />}
    {title && <meta property="og:title" content={title} />}
    {description && <meta property="og:description" content={description} />}
    {image && <meta property="og:image" content={image} />}
    {type && <meta property="og:type" content={type} />}
    {twitterCardType && <meta name="twitter:card" content={twitterCardType} />}
    {twitterCreator && <meta name="twitter:creator" content={twitterCreator} />}
  </React.Fragment>
)

OpenGraph.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.string,
  twitterCardType: PropTypes.oneOf([
    'summary',
    'summary_large_image',
    'app',
    'player'
  ]),
  twitterCreator: PropTypes.string
}

OpenGraph.defaultProps = {
  title: '180 Decibels',
  description:
    'Removing the Complexity from Managing your Team.  Our mission is to measurably improve team productivity with tactical operational tools and processes.',
  image: 'https://www.180decibels.com/180-Decibels.png',
  url: 'https://www.180decibels.com/',
  type: undefined,
  twitterCardType: 'summary_large_image',
  twitterCreator: undefined
}

export default OpenGraph
