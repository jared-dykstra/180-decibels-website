import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import { Player, ControlBar, BigPlayButton } from 'video-react'

import ShareButton from './ShareButton'

class VideoComponent extends PureComponent {
  constructor(props) {
    super(props)
    this.player = null
    this.state = {
      playerState: {
        started: false,
        hasEnded: false
      }
    }
  }

  componentDidMount() {
    this.player.subscribeToStateChange(this.handleStateChange)
  }

  // See: https://video-react.js.org/components/player/#state
  handleStateChange = state => {
    const { playerState } = this.state
    const { shareUrl, location } = this.props
    const { hasStarted, ended } = state
    const { hasStarted: prevHasStarted, ended: prevEnded } = playerState

    const details = {
      shareUrl,
      pathname: location.pathname
    }

    if (ended && !prevEnded) {
      console.log(`VideoComponent - onEnd(${JSON.stringify(details)})`)
    }

    if (hasStarted && !prevHasStarted) {
      console.log(`VideoComponent onStart(${JSON.stringify(details)})`)
    }

    // console.log(`Video Player State: ${JSON.stringify(state, null, 2)}`)

    this.setState(() => ({
      playerState: state
    }))
  }

  render() {
    const { poster, src, shareUrl } = this.props
    return (
      <Player
        // preload="auto"
        aspectRatio="16:9"
        poster={poster}
        ref={player => {
          this.player = player
        }}
      >
        <source src={src} />
        <BigPlayButton position="center" />
        <ControlBar autoHide={false}>
          <ShareButton order={7} shareUrl={shareUrl} />
        </ControlBar>
      </Player>
    )
  }
}

VideoComponent.propTypes = {
  poster: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  shareUrl: PropTypes.string,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired })
    .isRequired
}

VideoComponent.defaultProps = {
  shareUrl: undefined
}

export default withRouter(VideoComponent)
