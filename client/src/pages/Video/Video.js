import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import { Template, Video } from 'components'

import pageStyles from '../pageStyles'

const styles = theme => ({
  ...pageStyles({ theme })
})

const VideoPage = ({ classes, ...rest }) => {
  const { title, location } = rest
  return (
    <Template {...{ title, location, className: classes.root, elevation: 0 }}>
      <Video {...rest} />
    </Template>
  )
}

VideoPage.propTypes = {
  title: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  location: PropTypes.shape({
    hash: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
  }).isRequired, // <-- Passed down from react router
  tracker: PropTypes.shape({
    event: PropTypes.func.isRequired
  }).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired
}

export default withStyles(styles)(VideoPage)
