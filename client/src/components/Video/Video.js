import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Paper } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { Player, ControlBar, BigPlayButton } from 'video-react'

import 'video-react/dist/video-react.css'

import ShareButton from './ShareButton'

const styles = theme => {
  const controlBarHeight = '30px'
  return {
    root: {
      paddingBottom: controlBarHeight,
      '& .video-react .video-react-poster': {
        backgroundColor: 'transparent !important'
      },
      '& .video-react .video-react-control-bar': {
        display: 'flex !important',
        fontFamily: theme.decibels.fontFamily,
        marginBottom: `-${controlBarHeight}`
      }
    },
    // The video control runs out of space on very narrow screens
    share: {
      [theme.breakpoints.down(350)]: {
        display: 'none !important'
      }
    }
  }
}

class VideoComponent extends PureComponent {
  static propTypes = {
    poster: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    shareUrl: PropTypes.string,
    elevation: PropTypes.number,
    className: PropTypes.string,
    location: PropTypes.shape({ pathname: PropTypes.string.isRequired })
      .isRequired,
    tracker: PropTypes.shape({
      event: PropTypes.func.isRequired
    }).isRequired,
    classes: PropTypes.objectOf(PropTypes.string).isRequired
  }

  static defaultProps = {
    shareUrl: undefined,
    className: '',
    elevation: 2
  }

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
    const { shareUrl, location, tracker } = this.props
    const { hasStarted, ended } = state
    const { hasStarted: prevHasStarted, ended: prevEnded } = playerState

    if (ended && !prevEnded) {
      if (tracker) {
        tracker.event({
          category: `Video-${location.pathname}-${shareUrl}`,
          action: 'play complete'
        })
      }
    }

    if (hasStarted && !prevHasStarted) {
      if (tracker) {
        tracker.event({
          category: `Video-${location.pathname}-${shareUrl}`,
          action: 'begin play'
        })
      }
    }

    this.setState(() => ({
      playerState: state
    }))
  }

  render() {
    const { poster, src, shareUrl, classes, className, elevation } = this.props
    return (
      <Paper {...{ elevation, className: `${classes.root} ${className}` }}>
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
            <ShareButton
              order={7}
              shareUrl={shareUrl}
              className={classes.share}
            />
          </ControlBar>
        </Player>
      </Paper>
    )
  }
}

export default withRouter(withStyles(styles)(VideoComponent))
