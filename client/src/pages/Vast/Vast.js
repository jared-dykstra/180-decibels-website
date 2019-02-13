import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  AppBar,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Popover,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Typography
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MenuIcon from '@material-ui/icons/Menu'
import CheckIcon from '@material-ui/icons/CheckBox'
import CheckEmptyIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import HistoryIcon from '@material-ui/icons/History'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

import { Template } from 'components'

import { deleteView, setActiveView } from 'reduxStore/vast/vastActions'
import {
  viewListSelector,
  activeViewIdSelector
} from 'reduxStore/vast/vastSelectors'

import pageStyles from '../pageStyles'
import GraphTab from './GraphTab'
import Intro from './Intro'
import Timeline from './Timeline'
import AddNewView, { addNewViewButton } from './AddNewView'

const drawerWidth = 400

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
  grow: {
    flexGrow: '1'
  },
  introContainer: {
    flexGrow: '1',
    position: 'relative'
  },
  intro: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    overflowY: 'auto'
  },
  appBar: {},
  drawerButton: {
    marginLeft: 12,
    marginRight: 20
  },
  drawer: {
    // width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    maxWidth: '80vw'
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start'
  },
  timeline: {
    backgroundColor: '#eee'
  },
  drawerHeading: {
    paddingLeft: '1em'
  },
  drawerSubHeading: {
    paddingLeft: '3em'
  }
})

const MENU_ITEM_RENAME = 'rename'
const MENU_ITEM_DELETE = 'close'
const MENU_ITEM_DUPLICATE = 'duplicate'

class Vast extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    viewId: PropTypes.string,
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

  static defaultProps = {
    viewId: false
  }

  constructor(props) {
    super(props)
    this.changeButtonAnchorEls = {}
    this.allButtonAnchorEl = null
    this.newButtonAnchorEl = null
    this.counter = 0
    this.addNewRef = null // React.createRef()
    this.state = {
      menuAllOpen: false,
      menuChangeOpen: null,
      renaming: null,
      open: false
    }
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ open: !state.open }))
  }

  handleDrawerClose = () => {
    this.setState(() => ({ open: false }))
  }

  // Begin ChangeMenu handlers
  handleChangeTab = (event, viewId) => {
    const { doSetActiveView } = this.props
    doSetActiveView(viewId)
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
        doDeleteView({ viewId: id })
        break
      }
      case MENU_ITEM_DUPLICATE:
      default:
        throw new Error('Not Implemented')
    }
  }

  // End ChangeMenu handlers

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
    const { title, location, viewId, viewList, classes } = this.props
    const {
      menuAllOpen,
      menuNewOpen,
      menuChangeOpen,
      renaming,
      open
    } = this.state
    const menuElevation = 2
    const allMenuId = 'all-menu-popover'

    const self = this

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
          <GraphTab key={viewId} viewId={viewId} className={classes.grow} />
        ) : (
          <div className={classes.introContainer}>
            <div className={classes.intro}>
              <Intro
                button={addNewViewButton({
                  onClick: e => {
                    self.addNewRef.handleMenuNewToggle(e)
                  }
                })}
              />
            </div>
          </div>
        )}
        <AppBar position="static" color="default" className={classes.appBar}>
          <Toolbar variant="dense" disableGutters>
            <AddNewView
              // withStyles() exposes innerRef.  yay!
              innerRef={ref => {
                self.addNewRef = ref
              }}
              elevation={menuElevation}
            />

            <IconButton
              color="secondary"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.drawerButton}
              disabled
            >
              <HistoryIcon />
            </IconButton>

            {viewList.length > 1 && (
              <IconButton
                key="tab-list-menu-icon"
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
            )}
            <Popover
              key="tab-list-menu"
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
        <Drawer
          className={classes.drawer}
          variant="temporary"
          anchor="right"
          open={open}
          ModalProps={{ onBackdropClick: this.handleDrawerClose }}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronRightIcon />
            </IconButton>
          </div>
          <Divider />
          <Typography
            variant="h6"
            color="secondary"
            className={classes.drawerHeading}
          >
            Files
          </Typography>
          <List>
            <ListItem button selected>
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText>Sample Software Company</ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <CheckEmptyIcon />
              </ListItemIcon>
              <ListItemText>Sample Marketing Company</ListItemText>
            </ListItem>
          </List>
          <Divider />
          <div className={classes.timeline}>
            <Typography
              variant="h6"
              color="secondary"
              className={classes.drawerHeading}
            >
              Revision History
            </Typography>
            <Typography className={classes.drawerSubHeading}>
              Sample Software Company
            </Typography>
            <Timeline />
          </div>
        </Drawer>
      </Template>
    )
  }
}

export default connect(
  (state, props) => ({
    viewList: viewListSelector(state, props),
    viewId: activeViewIdSelector(state, props)
  }),
  dispatch => ({
    doDeleteView: args => dispatch(deleteView(args)),
    doSetActiveView: viewId => dispatch(setActiveView({ viewId }))
  })
)(withStyles(styles)(Vast))
