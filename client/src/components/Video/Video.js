import React from 'react'
import PropTypes from 'prop-types'
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
        fontFamily: 'Ubuntu',
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

const Video = ({ poster, src, shareUrl, classes, className, elevation }) => (
  <Paper {...{ elevation, className: `${classes.root} ${className}` }}>
    <Player
      // preload="auto"
      aspectRatio="16:9"
      poster={poster}
    >
      <source src={src} />
      <BigPlayButton position="center" />
      <ControlBar autoHide={false}>
        <ShareButton order={7} shareUrl={shareUrl} className={classes.share} />
      </ControlBar>
    </Player>
  </Paper>
)

Video.propTypes = {
  poster: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  shareUrl: PropTypes.string,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  className: PropTypes.string,
  elevation: PropTypes.number
}

Video.defaultProps = {
  shareUrl: undefined,
  className: '',
  elevation: 2
}

export default withStyles(styles)(Video)
