import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { CssBaseline, Paper } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import { Header, Footer } from 'components'

const styles = theme => ({
  '@global': {
    html: {
      height: '100%'
    },
    '#root': {
      height: '100%'
    },
    body: {
      height: '100%',
      fontFamily: theme.decibels.fontFamily,
      lineHeight: '1.75em',
      '& a': {
        textDecoration: 'none',
        color: theme.palette.primary.main
      },
      '& a:hover': {
        textDecoration: 'none',
        color: theme.palette.secondary.main
      },
      '& h1, h2, h3, h4, h5, h6': {
        color: theme.palette.secondary.main,
        fontWeight: theme.decibels.fontWeightLight
      }
    }
  },
  flexContainer: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  layout: {
    flexGrow: '1'
  }
})

const Template = ({
  title,
  // description,
  // location,
  // imageUrl,
  // type,
  // twitterCardType,
  // twitterCreator,
  elevation,
  className,
  children,
  classes
}) =>
  // const rootUrl = configGet('rootUrl')
  // const { pathname, hash, search } = location
  // const url = `${rootUrl}${pathname}${
  //   search && search.length > 0 ? search : ''
  // }${hash && hash.length > 0 ? hash : ''}`
  [
    <Helmet key="helmet">
      <title>{title}</title>
      {/* Not currently being used--but this is useful if SSR or pre-rendering is enabled in the future.
          To set these tags, see server/src/openGraph.js
        <meta name="description" content={description} />
        <meta property="og:url" content={url} />,
        <meta property="og:title" content={title} />,
        <meta property="og:description" content={description} />,
        <meta property="og:image" content={imageUrl} />,
        <meta property="og:type" content={type} />,
        <meta name="twitter:card" content={twitterCardType} />,
        <meta name="twitter:creator" content={twitterCreator} />
              */}
    </Helmet>,
    <CssBaseline key="baseline" />,
    <div key="main" className={classes.flexContainer}>
      <Header />
      <Paper
        square
        {...{ className: `${classes.layout} ${className}`, elevation }}
      >
        {children}
      </Paper>
    </div>,
    <Footer key="footer" />
  ]

Template.propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
  }).isRequired, // <-- Passed down from react router
  title: PropTypes.string.isRequired,
  // description: PropTypes.string.isRequired,
  // imageUrl: PropTypes.string.isRequired,
  // type: PropTypes.string,
  // twitterCardType: PropTypes.oneOf([
  //   'summary',
  //   'summary_large_image',
  //   'app',
  //   'player'
  // ]),
  // twitterCreator: PropTypes.string,
  elevation: PropTypes.number,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired
}

Template.defaultProps = {
  title: '180 Decibels',
  // description:
  //   'Removing the Complexity from Managing your Team.  Our mission is to measurably improve team productivity and maximize profitability.',
  // imageUrl: 'https://www.180decibels.com/180-Decibels.png',
  // type: 'website',
  // twitterCardType: 'summary_large_image',
  // twitterCreator: '1Decibels',
  elevation: 2,
  className: ''
}

export default withStyles(styles)(Template)
