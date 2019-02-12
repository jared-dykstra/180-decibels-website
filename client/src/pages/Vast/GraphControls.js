import uuid from 'uuid/v4'
import { without as _without } from 'lodash'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Checkbox,
  Chip,
  ClickAwayListener,
  Fab,
  Grid,
  Input,
  ListItemText,
  Select,
  Tooltip,
  Menu,
  MenuItem
} from '@material-ui/core'

import { SpeedDial, SpeedDialAction } from '@material-ui/lab'
import SpeedDialIcon from '@material-ui/icons/Loop'
import GridIcon from '@material-ui/icons/DragIndicator'
import CircularIcon from '@material-ui/icons/BlurCircular'
import ConcentricIcon from '@material-ui/icons/GpsFixed'
import ShareIcon from '@material-ui/icons/Share'
import TreeIcon from '@material-ui/icons/DeviceHub'
import AddIcon from '@material-ui/icons/Add'

import { withStyles } from '@material-ui/core/styles'

import { selectedNodeTypesSelector } from 'reduxStore/vast/vastSelectors'
import {
  layout,
  addNode,
  setSelectedNodeTypes
} from 'reduxStore/vast/vastActions'
import { NODE_TYPE_CLASS_MAP } from 'reduxStore/vast/vastConstants'

const styles = theme => ({
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: theme.spacing.unit / 4
  },
  speedDial: {
    // position: 'absolute',
    top: theme.spacing.unit * 2,
    left: theme.spacing.unit * 3
  }
})

class GraphTab extends PureComponent {
  static propTypes = {
    // viewId is used in connect (below)
    // eslint-disable-next-line react/no-unused-prop-types
    viewId: PropTypes.string.isRequired,
    selectedNodeTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
    doAddNode: PropTypes.func.isRequired,
    doLayout: PropTypes.func.isRequired,
    doSetSelectedNodeTypes: PropTypes.func.isRequired,
    className: PropTypes.string,
    classes: PropTypes.objectOf(PropTypes.string).isRequired
  }

  static defaultProps = {
    className: ''
  }

  constructor(props) {
    super(props)
    this.state = {
      layoutOpen: false,
      anchorElAdd: null
    }
  }

  handleRemoveNodeType = value => {
    const { selectedNodeTypes, doSetSelectedNodeTypes } = this.props
    doSetSelectedNodeTypes(_without(selectedNodeTypes, value))
  }

  handleLayoutClick = (e, opts) => {
    const { doLayout } = this.props
    doLayout({ forceUpdate: true, opts })
    this.setState(state => ({
      layoutOpen: !state.layoutOpen
    }))
  }

  handleLayoutClose = () => {
    this.setState({ layoutOpen: false })
  }

  handleLayoutOpen = () => {
    this.setState({ layoutOpen: true })
  }

  handleClickAdd = event => {
    this.setState({ anchorElAdd: event.currentTarget })
  }

  handleCloseAdd = () => {
    this.setState({ anchorElAdd: null })
  }

  handleAddNode = (e, nodeType) => {
    const { doAddNode } = this.props
    doAddNode({
      nodeId: uuid(),
      label: `New ${nodeType}`,
      type: nodeType
    })

    this.setState({ anchorElAdd: null })
  }

  render() {
    const {
      selectedNodeTypes,
      doSetSelectedNodeTypes,
      className,
      classes
    } = this.props
    const { layoutOpen, anchorElAdd } = this.state
    const layoutActions = [
      {
        icon: <ShareIcon />,
        name: 'Graph',
        layout: {
          name: 'cola',
          nodeDimensionsIncludeLabels: true
          // infinite: true
        }
      },
      {
        icon: <CircularIcon />,
        name: 'Circular',
        layout: {
          name: 'circle',
          animate: true
        }
      },
      {
        icon: <ConcentricIcon />,
        name: 'Concentric',
        layout: {
          name: 'concentric',
          nodeDimensionsIncludeLabels: true,
          animate: true
        }
      },
      {
        icon: <GridIcon />,
        name: 'Grid',
        layout: {
          name: 'grid',
          // nodeDimensionsIncludeLabels: true,
          animate: true
        }
      },
      {
        icon: <TreeIcon />,
        name: 'Tree',
        layout: {
          name: 'breadthfirst',
          nodeDimensionsIncludeLabels: true,
          animate: true
        }
      }
    ]

    return (
      <Grid
        container
        direction="column"
        justify="space-around"
        alignItems="flex-start"
        className={className}
      >
        <Grid item>
          {/* <Tooltip title="Filter" aria-label="Filter" placement="bottom-start"> */}
          <Select
            multiple
            value={selectedNodeTypes}
            onChange={e => doSetSelectedNodeTypes(e.target.value)}
            input={<Input id="select-multiple-chip" />}
            renderValue={selected => (
              <div className={classes.chips}>
                {selected.map(value => (
                  <Chip
                    key={value}
                    label={value}
                    className={classes.chip}
                    onDelete={() => this.handleRemoveNodeType(value)}
                    style={{ color: NODE_TYPE_CLASS_MAP[value].color }}
                  />
                ))}
              </div>
            )}
            MenuProps={{ disableAutoFocusItem: true }}
          >
            {Object.entries(NODE_TYPE_CLASS_MAP).map(([k, v]) => (
              <MenuItem key={k} value={k} style={{ color: v.color }}>
                <Checkbox
                  color="inherit"
                  style={{ color: v.color }}
                  checked={selectedNodeTypes.indexOf(k) > -1}
                />
                <ListItemText
                  primary={<span style={{ color: v.color }}>{k}</span>}
                />
              </MenuItem>
            ))}
          </Select>
          {/* </Tooltip> */}
        </Grid>
        <Grid item>
          <Tooltip
            title="Refresh Layout"
            aria-label="Refresh Layout"
            placement="bottom-start"
          >
            <SpeedDial
              ariaLabel="Layout Options"
              className={classes.speedDial}
              icon={<SpeedDialIcon />}
              onBlur={this.handleLayoutClose}
              onClick={this.handleLayoutClick}
              onClose={this.handleLayoutClose}
              onFocus={this.handleLayoutOpen}
              onMouseEnter={this.handleLayoutOpen}
              onMouseLeave={this.handleLayoutClose}
              open={layoutOpen}
              direction="right"
              ButtonProps={{ color: 'default' }}
            >
              {layoutActions.map(action => (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  tooltipPlacement="top"
                  onClick={e => this.handleLayoutClick(e, action.layout)}
                />
              ))}
            </SpeedDial>
          </Tooltip>
        </Grid>
        <Grid item>
          <ClickAwayListener onClickAway={this.handleCloseAdd}>
            <Tooltip
              title="Add Node"
              aria-label="Add Node"
              placement="bottom-start"
            >
              <Fab
                color="default"
                aria-label="Add"
                aria-owns={anchorElAdd ? 'simple-menu' : undefined}
                aria-haspopup="true"
                onClick={this.handleClickAdd}
              >
                <AddIcon />
              </Fab>
            </Tooltip>
            <Menu
              id="add-menu"
              anchorEl={anchorElAdd}
              open={Boolean(anchorElAdd)}
              onClose={this.handleCloseAdd}
              disableAutoFocusItem
            >
              {Object.entries(NODE_TYPE_CLASS_MAP).map(([k, v]) => (
                <MenuItem
                  style={{ color: v.color }}
                  onClick={e => this.handleAddNode(e, k)}
                >
                  {k}
                </MenuItem>
              ))}
            </Menu>
          </ClickAwayListener>
        </Grid>
      </Grid>
    )
  }
}

export default connect(
  state => ({
    selectedNodeTypes: selectedNodeTypesSelector(state)
  }),
  (dispatch, props) => ({
    doLayout: args => dispatch(layout({ viewId: props.viewId, ...args })),
    doAddNode: args => dispatch(addNode(args, props)),
    doSetSelectedNodeTypes: nodeTypes =>
      dispatch(setSelectedNodeTypes(nodeTypes, props))
  })
)(withStyles(styles, { withTheme: true })(GraphTab))
