import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import ShareIcon from '@material-ui/icons/Share'

// See: https://video-react.js.org/customize/customize-component/
class ShareButton extends PureComponent {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    player: PropTypes.object,
    className: PropTypes.string
  }

  static defaultProps = {
    player: {},
    className: ''
  }

  handleClick = () => {
    const { player } = this.props
    const { currentSrc } = player

    // TODO: Open a Dialog or something...
  }

  render() {
    const { className } = this.props
    return (
      <button
        type="button"
        className={`video-react-control video-react-button video-react-icon ${className}`}
      >
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

export default ShareButton
