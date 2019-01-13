import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Popover, Typography } from '@material-ui/core'
import ShareIcon from '@material-ui/icons/Share'

const styles = theme => ({
  typography: {
    margin: theme.spacing.unit * 2
  }
})

// See: https://video-react.js.org/customize/customize-component/
class ShareButton extends PureComponent {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    player: PropTypes.object,
    shareUrl: PropTypes.string,
    classes: PropTypes.objectOf(PropTypes.string).isRequired
  }

  static defaultProps = {
    player: {},
    shareUrl: undefined
  }

  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null
    }
  }

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget
    })
  }

  handleClose = () => {
    this.setState({
      anchorEl: null
    })
  }

  render() {
    const { player, classes, shareUrl } = this.props
    const { anchorEl } = this.state
    const { currentSrc } = player

    const open = Boolean(anchorEl)
    return (
      <button
        type="button"
        className="video-react-control video-react-button video-react-icon"
      >
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
        >
          <Typography className={classes.typography}>{`Share: ${shareUrl ||
            currentSrc}`}</Typography>
        </Popover>
        <ShareIcon
          fontSize="inherit"
          style={{
            fontSize: '2em'
          }}
          onClick={this.handleClick}
        />
      </button>
    )
  }
}

export default withStyles(styles)(ShareButton)
