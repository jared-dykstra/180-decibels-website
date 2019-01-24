import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Fab, Grid, Popover, Typography } from '@material-ui/core'
import ShareIcon from '@material-ui/icons/Share'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import CopyIcon from './CopyToClipboardIcon'

const styles = theme => ({
  typography: {
    margin: theme.spacing.unit
  }
})

// See: https://video-react.js.org/customize/customize-component/
class ShareButton extends PureComponent {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    player: PropTypes.object,
    shareUrl: PropTypes.string,
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    className: PropTypes.string
  }

  static defaultProps = {
    player: {},
    shareUrl: undefined,
    className: ''
  }

  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null,
      copied: false
    }
  }

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget
    })
  }

  handleClose = () => {
    this.setState({
      copied: false,
      anchorEl: null
    })
  }

  render() {
    const { player, classes, shareUrl, className } = this.props
    const { anchorEl, copied } = this.state
    const { currentSrc } = player

    const copyUrl = shareUrl || currentSrc

    const open = Boolean(anchorEl)
    return (
      <button
        type="button"
        className={`video-react-control video-react-button video-react-icon ${className}`}
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
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.typography}
            spacing={24}
            style={{ width: '100%' }}
          >
            <Grid item>
              <a href={copyUrl} target="_blank" rel="noopener noreferrer">
                {copyUrl}
              </a>
              <br />
              <Typography>{copied ? 'Copied to Clipboard.' : null}</Typography>
            </Grid>
            <Grid item>
              <CopyToClipboard
                text={copyUrl}
                onCopy={() => this.setState({ copied: true })}
              >
                <Fab color="primary" size="small">
                  <CopyIcon />
                </Fab>
              </CopyToClipboard>
            </Grid>
          </Grid>
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
