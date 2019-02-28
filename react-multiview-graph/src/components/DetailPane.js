import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { ClickAwayListener, Paper, Popper } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  paper: {
    width: '80vh',
    height: '10em',
    padding: '3em'
  },
  popper: {
    zIndex: 1,
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent ${
          theme.palette.common.white
        } transparent`
      }
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '1em 1em 0 1em',
        borderColor: `${
          theme.palette.common.white
        } transparent transparent transparent`
      }
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      marginLeft: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 1em 1em 0',
        borderColor: `transparent ${
          theme.palette.common.white
        } transparent transparent`
      }
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 0 1em 1em',
        borderColor: `transparent transparent transparent ${
          theme.palette.common.white
        }`
      }
    }
  },
  arrow: {
    position: 'absolute',
    fontSize: 7,
    width: '3em',
    height: '3em',
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid'
    }
  }
})

class DetailPane extends PureComponent {
  static propTypes = {
    graph: PropTypes.shape({
      on: PropTypes.func.isRequired
    }).isRequired,
    detailsNode: PropTypes.shape({
      on: PropTypes.func.isRequired
    }).isRequired,
    onClose: PropTypes.func,
    className: PropTypes.string,
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]).isRequired
  }

  static defaultProps = {
    onClose: () => {},
    className: ''
  }

  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null,
      arrowRef: null
    }
  }

  componentDidMount() {
    // console.log(`DetailPane componentDidMount`)
    const { graph, detailsNode } = this.props
    if (detailsNode) {
      detailsNode.on('position', this.handleDetailsUpdate)
      graph.on('pan zoom resize', this.handleDetailsUpdate)
      this.handleDetailsUpdate()
    }
  }

  componentDidUpdate() {
    // console.log(`DetailPane componentDidUpdate`)
  }

  componentWillUnmount() {
    // console.log(`DetailPane componentWillUnmount`)
    const { graph, detailsNode } = this.props
    detailsNode.removeListener('position', this.handleDetailsUpdate)
    graph.removeListener('pan zoom resize', this.handleDetailsUpdate)
    this.setState({
      anchorEl: null,
      arrowRef: null
    })
  }

  handleDetailsUpdate = () => {
    this.setState((state, props) => {
      const { detailsNode } = props

      if (!detailsNode) {
        return state
      }

      // rect is a DOMRect object with eight properties: left, top, right, bottom, x, y, width, height
      const getBoundingClientRect = () => {
        const position = detailsNode.renderedPosition()
        const box = detailsNode.renderedBoundingBox()

        return {
          left: box.x1,
          top: box.y1,
          right: box.x2,
          bottom: box.y2,
          x: position.x,
          y: position.y,
          width: box.x2 - box.x1,
          height: box.y2 - box.y1
        }
      }
      const currentRect = getBoundingClientRect()
      return {
        anchorEl: {
          clientWidth: currentRect.width,
          clientHeight: currentRect.height,
          getBoundingClientRect
        }
      }
    })
  }

  handleArrowRef = node => {
    this.setState({
      arrowRef: node
    })
  }

  render() {
    const { className, classes, detailsNode, onClose, children } = this.props
    const { anchorEl, arrowRef } = this.state
    return (
      <Popper
        open={detailsNode != null}
        anchorEl={anchorEl}
        placement="bottom"
        disablePortal={false}
        className={classes.popper}
        modifiers={{
          flip: {
            enabled: true
          },
          preventOverflow: {
            enabled: true,
            boundariesElement: 'scrollParent'
          },
          arrow: anchorEl && {
            enabled: true,
            element: arrowRef
          }
        }}
      >
        <span className={classes.arrow} ref={this.handleArrowRef} />
        <ClickAwayListener onClickAway={onClose}>
          <Paper className={`${className} ${classes.paper}`}>{children}</Paper>
        </ClickAwayListener>
      </Popper>
    )
  }
}

export default withStyles(styles)(DetailPane)
