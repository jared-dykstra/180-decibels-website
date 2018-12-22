import React from 'react'
import PropTypes from 'prop-types'

import { Player, ControlBar, BigPlayButton } from 'video-react'

const Video = ({ poster, src }) => (
  <Player
    // preload="auto"
    aspectRatio="16:9"
    poster={poster}
  >
    <source src={src} />
    <BigPlayButton position="center" />
    <ControlBar autoHide />
  </Player>
)

Video.propTypes = {
  poster: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired
}

export default Video
