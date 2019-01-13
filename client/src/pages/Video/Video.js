import React from 'react'
import PropTypes from 'prop-types'
import { Paper } from '@material-ui/core'

import { Template, Video } from 'components'

const VideoPage = ({ title, poster, src, tracker, location, className }) => (
  <Template {...{ title, location, className }}>
    <Paper style={{ paddingBottom: '3em' }}>
      <Video {...{ poster, src, tracker }} />
    </Paper>
  </Template>
)

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
  className: PropTypes.string
}

VideoPage.defaultProps = {
  className: ''
}

export default VideoPage
