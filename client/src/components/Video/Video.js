import React from 'react'
import PropTypes from 'prop-types'

import { Player, ControlBar, BigPlayButton } from 'video-react'

import ShareButton from './ShareButton'

const Video = ({ poster, src }) => (
  <Player
    // preload="auto"
    aspectRatio="16:9"
    poster={poster}
  >
    <source src={src} />
    <BigPlayButton position="center" />
    <ControlBar autoHide={false}>{/* <ShareButton order={7} /> */}</ControlBar>
  </Player>
)

Video.propTypes = {
  poster: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired
}

export default Video
