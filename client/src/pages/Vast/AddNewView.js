import uuid from 'uuid/v4'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { NODE_TYPE_CLASS_MAP } from 'reduxStore/vast/vastConstants'

import {
  IconButton,
  MenuItem,
  MenuList,
  Popover,
  TextField
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import CreateIcon from '@material-ui/icons/NoteAdd'

import { createView } from 'reduxStore/vast/vastActions'

const newMenuId = 'new-menu-popover'

const styles = theme => ({
  search: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
  },
  indented: {
    marginLeft: theme.spacing.unit * 2
  }
})

class AddNewView extends PureComponent {
  static propTypes = {
    elevation: PropTypes.number,
    doCreateView: PropTypes.func.isRequired,
    classes: PropTypes.objectOf(PropTypes.string).isRequired
  }

  static defaultProps = {
    elevation: 2
  }

  constructor(props) {
    super(props)
    this.state = {
      menuNewOpen: false
    }
  }

  // Begin NewMenu handlers
  handleMenuNewToggle = () => {
    this.setState(state => ({ menuNewOpen: !state.menuNewOpen }))
  }

  handleMenuNewClose = event => {
    if (this.newButtonAnchorEl.contains(event.target)) {
      return
    }
    this.setState({ menuNewOpen: false })
  }

  handleMenuNewSelect = (e, nodeTypes) => {
    const { doCreateView } = this.props
    const view = {
      id: uuid(),
      name: `View ${(this.counter += 1)}`,
      nodeTypes
    }
    doCreateView(view)
    this.setState(() => ({ menuNewOpen: false }))
  }
  // End NewMenu handlers

  render() {
    const { classes, elevation } = this.props
    const { menuNewOpen } = this.state
    return [
      <IconButton
        key="icon"
        color="secondary"
        aria-label="New Tab"
        buttonRef={node => {
          this.newButtonAnchorEl = node
        }}
        aria-owns={menuNewOpen ? newMenuId : undefined}
        aria-haspopup="true"
        onClick={this.handleMenuNewToggle}
      >
        <CreateIcon />
      </IconButton>,
      <Popover
        key="popover"
        id={newMenuId}
        elevation={elevation}
        open={menuNewOpen}
        onClose={this.handleMenuNewClose}
        anchorEl={this.newButtonAnchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <nav>
          <MenuList>
            <MenuItem
              onClick={e =>
                this.handleMenuNewSelect(e, Object.keys(NODE_TYPE_CLASS_MAP))
              }
            >
              All Types
            </MenuItem>

            {Object.entries(NODE_TYPE_CLASS_MAP).map(([nodeType, details]) => (
              <MenuItem
                key={nodeType}
                className={classes.indented}
                style={{ color: details.color }}
                onClick={e =>
                  this.handleMenuNewSelect(e, [
                    nodeType,
                    ...details.secondaryDimension
                  ])
                }
              >
                {nodeType}
              </MenuItem>
            ))}

            <TextField
              label="Search For..."
              type="search"
              className={classes.search}
            />
          </MenuList>
        </nav>
      </Popover>
    ]
  }
}

export const addNewViewButton = ({ onClick }) => (
  <IconButton
    color="secondary"
    aria-label="New Tab"
    aria-haspopup="true"
    onClick={onClick}
  >
    <CreateIcon />
  </IconButton>
)

addNewViewButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default connect(
  () => ({}),
  dispatch => ({
    doCreateView: args => dispatch(createView(args))
  })
)(withStyles(styles)(AddNewView))
