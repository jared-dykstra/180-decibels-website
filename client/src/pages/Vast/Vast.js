import uuid from 'uuid/v4'
import { filter as _filter } from 'lodash'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  AppBar,
  Button,
  IconButton,
  MenuItem,
  MenuList,
  Popover,
  Tab,
  Tabs,
  TextField,
  Toolbar
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import CreateIcon from '@material-ui/icons/NoteAdd'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MenuIcon from '@material-ui/icons/Menu'

import { Template } from 'components'

import {
  NODE_TYPE_ACCOUNTABILITY,
  NODE_TYPE_PERSON,
  NODE_TYPE_PRIORITY
} from 'reduxStore/vast/vastConstants'
import {
  createView,
  deleteView,
  setActiveView
} from 'reduxStore/vast/vastActions'
import { viewListSelector } from 'reduxStore/vast/vastSelectors'

import pageStyles from '../pageStyles'
import GraphTab from './GraphTab'

const styles = theme => ({
  ...pageStyles({ theme, fullWidth: true, pagePadding: false }),
  root2: {
    display: 'flex',
    // Note: The following style is for IE only, which doesn't seem to respect backgroundColor: transparent
    '@media all and (-ms-high-contrast: none), (-ms-high-contrast: active)': {
      minHeight: 'calc(100vh - 70px)' // <== IE
    },
    flexDirection: 'column'
  },
  graph: {
    flexGrow: '1'
  },
  appBar: {},
  search: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
  }
})

const MENU_ITEM_RENAME = 'rename'
const MENU_ITEM_DELETE = 'close'
const MENU_ITEM_DUPLICATE = 'duplicate'

class Vast extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    doCreateView: PropTypes.func.isRequired,
    doDeleteView: PropTypes.func.isRequired,
    doSetActiveView: PropTypes.func.isRequired,
    viewList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      })
    ).isRequired,
    classes: PropTypes.objectOf(PropTypes.string).isRequired
  }

  constructor(props) {
    super(props)
    this.changeButtonAnchorEls = {}
    this.allButtonAnchorEl = null
    this.newButtonAnchorEl = null
    this.counter = 0
    this.state = {
      viewId: false, // <== No tab selected
      menuAllOpen: false,
      menuNewOpen: false,
      menuChangeOpen: null,
      renaming: null
    }
  }

  // Begin ChangeMenu handlers
  handleChangeTab = (event, viewId) => {
    const { doSetActiveView } = this.props
    doSetActiveView(viewId)
    this.setState(() => ({ viewId }))
  }

  handleMenuChangeToggle = (e, id) => {
    this.setState(state => {
      const { menuChangeOpen } = state
      const isOpen = menuChangeOpen !== null
      return { menuChangeOpen: isOpen ? null : id }
    })
  }

  handleMenuChangeClose = (event, id) => {
    if (this.changeButtonAnchorEls[id].contains(event.target)) {
      return
    }
    this.setState({ menuChangeOpen: null })
  }

  handleMenuChangeSelect = (e, payload) => {
    e.preventDefault()
    e.stopPropagation()
    const { type, id } = payload
    switch (type) {
      case MENU_ITEM_RENAME:
        this.setState(state => ({ renaming: id, menuChangeOpen: null }))
        break
      case MENU_ITEM_DELETE: {
        const { doDeleteView } = this.props
        this.setState((state, props) => {
          const { viewId } = state
          const { viewList } = props
          let nextViewId = viewId
          if (viewId === id) {
            // Deleting the currently selected View
            const allRemainingViews = _filter(viewList, v => v.id !== id)
            nextViewId =
              allRemainingViews.length > 0 ? allRemainingViews[0].id : false
          }
          return { menuChangeOpen: null, viewId: nextViewId }
        })
        doDeleteView({ id })
        break
      }
      case MENU_ITEM_DUPLICATE:
      default:
        throw new Error('Not Implemented')
    }
  }

  // End ChangeMenu handlers

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

  handleMenuNewSelect = () => {
    const { doCreateView } = this.props
    const view = {
      id: uuid(),
      name: `View ${(this.counter += 1)}`,
      nodeTypes: [
        NODE_TYPE_ACCOUNTABILITY,
        NODE_TYPE_PERSON,
        NODE_TYPE_PRIORITY
      ]
    }
    doCreateView(view)
    this.setState((state, props) => ({ viewId: view.id, menuNewOpen: false }))
  }
  // End NewMenu handlers

  // Begin AllMenu handlers
  handleMenuAllToggle = () => {
    this.setState(state => ({ menuAllOpen: !state.menuAllOpen }))
  }

  handleMenuAllClose = event => {
    if (this.allButtonAnchorEl.contains(event.target)) {
      return
    }
    this.setState({ menuAllOpen: false })
  }

  // End AllMenu handlers

  render() {
    const { title, location, viewList, classes } = this.props
    const {
      viewId,
      menuAllOpen,
      menuNewOpen,
      menuChangeOpen,
      renaming
    } = this.state
    const menuElevation = 2
    const newMenuId = 'new-menu-popover'
    const allMenuId = 'all-menu-popover'

    return (
      <Template
        {...{
          title,
          location,
          className: `${classes.root} ${classes.root2}`,
          elevation: 0
        }}
      >
        {viewId ? (
          // Note: `key` is important, as it will cause GrapTab to be unmounted/mounted whenever viewId changes
          <GraphTab key={viewId} viewId={viewId} className={classes.graph} />
        ) : (
          <div className={classes.graph}>
            Create a new view, yada, yada. The public/prototype should come up
            with a couple of pre-made views
          </div>
        )}
        <AppBar position="static" color="default" className={classes.appBar}>
          <Toolbar variant="dense" disableGutters>
            <IconButton
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
            </IconButton>
            <Popover
              id={newMenuId}
              elevation={menuElevation}
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
                  <MenuItem onClick={this.handleMenuNewSelect}>
                    Everything
                  </MenuItem>
                  <MenuItem disabled onClick={this.handleMenuNewSelect}>
                    People
                  </MenuItem>
                  <MenuItem disabled onClick={this.handleMenuNewSelect}>
                    Accountabilities
                  </MenuItem>
                  <MenuItem disabled onClick={this.handleMenuNewSelect}>
                    Priorities
                  </MenuItem>
                  <TextField
                    label="Search"
                    type="search"
                    className={classes.search}
                  />
                </MenuList>
              </nav>
            </Popover>

            <IconButton
              color="secondary"
              aria-label="All Tabs"
              buttonRef={node => {
                this.allButtonAnchorEl = node
              }}
              aria-owns={menuAllOpen ? allMenuId : undefined}
              aria-haspopup="true"
              onClick={this.handleMenuAllToggle}
            >
              <MenuIcon />
            </IconButton>
            <Popover
              id={allMenuId}
              elevation={menuElevation}
              open={menuAllOpen}
              onClose={this.handleMenuAllClose}
              anchorEl={this.allButtonAnchorEl}
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
                  {viewList.map(({ id, name }) => (
                    <MenuItem
                      key={id}
                      onClick={e => {
                        this.handleChangeTab(e, id)
                        this.handleMenuAllClose(e)
                      }}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </MenuList>
              </nav>
            </Popover>

            <Tabs
              value={viewId}
              onChange={this.handleChangeTab}
              // variant="scrollable"
            >
              {viewList.map(({ id, name }) => {
                const popoverId = `change-menu-${id}`
                const Renaming = (
                  <TextField
                    type="text"
                    autoFocus
                    required
                    margin="none"
                    placeholder={name}
                    // variant="outlined"
                  />
                )

                const Regular = (
                  <div>
                    {name}
                    <Button
                      color="secondary"
                      disableRipple
                      size="small"
                      aria-label={`${name}Change Menu`}
                      buttonRef={node => {
                        this.changeButtonAnchorEls[id] = node
                      }}
                      aria-owns={menuNewOpen ? popoverId : undefined}
                      aria-haspopup="true"
                      onClick={e => {
                        e.stopPropagation()
                        e.preventDefault()
                        this.handleMenuChangeToggle(e, id)
                      }}
                    >
                      <ExpandMoreIcon />
                    </Button>

                    <Popover
                      id={popoverId}
                      elevation={menuElevation}
                      open={menuChangeOpen === id}
                      onClose={e => this.handleMenuChangeClose(e, id)}
                      anchorEl={this.changeButtonAnchorEls[id]}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                      transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                      }}
                    >
                      <nav>
                        <MenuList>
                          <MenuItem
                            onClick={e =>
                              this.handleMenuChangeSelect(e, {
                                type: MENU_ITEM_DELETE,
                                id
                              })
                            }
                          >
                            Delete
                          </MenuItem>
                          <MenuItem
                            disabled
                            onClick={e =>
                              this.handleMenuChangeSelect(e, {
                                type: MENU_ITEM_DUPLICATE,
                                id
                              })
                            }
                          >
                            Duplicate
                          </MenuItem>
                          <MenuItem
                            onClick={e =>
                              this.handleMenuChangeSelect(e, {
                                type: MENU_ITEM_RENAME,
                                id
                              })
                            }
                          >
                            Rename...
                          </MenuItem>
                        </MenuList>
                      </nav>
                    </Popover>
                  </div>
                )

                return (
                  <Tab
                    key={id}
                    component="div"
                    label={renaming === id ? Renaming : Regular}
                    value={id}
                  />
                )
              })}
            </Tabs>
          </Toolbar>
        </AppBar>
      </Template>
    )
  }
}

export default connect(
  (state, props) => ({
    viewList: viewListSelector(state, props)
  }),
  dispatch => ({
    doCreateView: args => dispatch(createView(args)),
    doDeleteView: args => dispatch(deleteView(args)),
    doSetActiveView: viewId => dispatch(setActiveView({ viewId }))
  })
)(withStyles(styles)(Vast))
