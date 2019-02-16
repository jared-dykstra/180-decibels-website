import uuid from 'uuid/v4'
import { without as _without } from 'lodash'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Button,
  Checkbox,
  ClickAwayListener,
  Grid,
  Input,
  ListItemText,
  Select,
  Tooltip,
  Menu,
  Paper,
  MenuItem
} from '@material-ui/core'

import { SpeedDial, SpeedDialAction, ToggleButton } from '@material-ui/lab'
import SpeedDialIcon from '@material-ui/icons/Loop'
import GridIcon from '@material-ui/icons/DragIndicator'
import CircularIcon from '@material-ui/icons/BlurCircular'
import ConcentricIcon from '@material-ui/icons/GpsFixed'
import ShareIcon from '@material-ui/icons/Share'
import TreeIcon from '@material-ui/icons/DeviceHub'
import AddIcon from '@material-ui/icons/Add'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ConnectionsIcon from '@material-ui/icons/CompareArrows'
import FilterIcon from '@material-ui/icons/FilterList'

import { withStyles } from '@material-ui/core/styles'

import {
  selectedNodeTypesSelector,
  editModeSelector
} from 'reduxStore/vast/vastSelectors'
import {
  layout,
  addNode,
  setSelectedNodeTypes,
  toggleEditMode
} from 'reduxStore/vast/vastActions'
import { NODE_TYPE_CLASS_MAP } from 'reduxStore/vast/vastConstants'

const styles = theme => ({
  speedDial: {
    // position: 'absolute',
    top: theme.spacing.unit * 2,
    left: theme.spacing.unit * 3
  },
  speedDialFab: {
    background: theme.palette.background.default
  },
  buttonContainer: {
    height: '2.5em',
    // padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    // margin: `${theme.spacing.unit}px 0`,
    background: theme.palette.background.default
  },
  button: {
    height: '100%'
  },
  selectButton: {
    height: '2.5em'
  }
})

class GraphTab extends PureComponent {
  static propTypes = {
    // viewId is used in connect (below)
    // eslint-disable-next-line react/no-unused-prop-types
    viewId: PropTypes.string.isRequired,
    selectedNodeTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
    editMode: PropTypes.bool.isRequired,
    doAddNode: PropTypes.func.isRequired,
    doLayout: PropTypes.func.isRequired,
    doSetSelectedNodeTypes: PropTypes.func.isRequired,
    doToggleEditMode: PropTypes.func.isRequired,
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

  handleEditMode = () => {
    const { doToggleEditMode } = this.props
    doToggleEditMode()
  }

  render() {
    const elevation = 4
    const {
      selectedNodeTypes,
      doSetSelectedNodeTypes,
      className,
      classes,
      editMode
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
          animate: true,
          concentric: ele => {
            const type = ele.data('type')
            if (type) {
              return NODE_TYPE_CLASS_MAP[type].rank
            }
            return 1
          },
          levelWidth: () => 1
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
          animate: true,
          directed: true,
          maximal: false
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
        spacing={16}
      >
        <Grid item>
          <Paper className={classes.buttonContainer} elevation={elevation}>
            <Tooltip
              title="Filter"
              aria-label="Filter"
              placement="bottom-start"
            >
              <Select
                multiple
                value={selectedNodeTypes}
                onChange={e => doSetSelectedNodeTypes(e.target.value)}
                input={<Input disableUnderline />}
                IconComponent={() => null}
                renderValue={selected => (
                  <Button className={classes.selectButton}>
                    <FilterIcon />
                    <ArrowDropDownIcon />
                  </Button>
                )}
                MenuProps={{ disableAutoFocusItem: true }}
                SelectDisplayProps={{ style: { padding: 0 } }}
              >
                {Object.entries(NODE_TYPE_CLASS_MAP).map(([k, v]) => (
                  <MenuItem key={k} value={k} style={{ color: v.color }}>
                    <Checkbox
                      style={{ color: v.color }}
                      checked={selectedNodeTypes.indexOf(k) > -1}
                    />
                    <ListItemText
                      primary={<span style={{ color: v.color }}>{k}</span>}
                    />
                  </MenuItem>
                ))}
              </Select>
            </Tooltip>
            <Tooltip
              title="Edit Connections"
              aria-label="Edit Connections"
              placement="bottom-start"
            >
              <ToggleButton
                className={classes.button}
                selected={editMode}
                onChange={this.handleEditMode}
                value="editMode"
              >
                <ConnectionsIcon />
              </ToggleButton>
            </Tooltip>
            <Tooltip
              title="Add Node"
              aria-label="Add Node"
              placement="bottom-start"
            >
              <Button
                className={classes.button}
                color="default"
                aria-label="Add"
                aria-owns={anchorElAdd ? 'simple-menu' : undefined}
                aria-haspopup="true"
                onClick={this.handleClickAdd}
              >
                <AddIcon />
                <ArrowDropDownIcon />
              </Button>
            </Tooltip>
            <ClickAwayListener onClickAway={this.handleCloseAdd}>
              <Menu
                id="add-menu"
                anchorEl={anchorElAdd}
                open={Boolean(anchorElAdd)}
                onClose={this.handleCloseAdd}
                disableAutoFocusItem
              >
                {Object.entries(NODE_TYPE_CLASS_MAP).map(([k, v]) => (
                  <MenuItem
                    key={k}
                    style={{ color: v.color }}
                    onClick={e => this.handleAddNode(e, k)}
                  >
                    {k}
                  </MenuItem>
                ))}
              </Menu>
            </ClickAwayListener>
          </Paper>
        </Grid>
        <Grid item>
          <Tooltip
            title="Update or Change Layout"
            aria-label="Update or Change Layout"
            placement="bottom-start"
          >
            <SpeedDial
              ariaLabel="Layout Options"
              classes={{ root: classes.speedDial, fab: classes.speedDialFab }}
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
      </Grid>
    )
  }
}

export default connect(
  state => ({
    selectedNodeTypes: selectedNodeTypesSelector(state),
    editMode: editModeSelector(state)
  }),
  (dispatch, props) => ({
    doLayout: args => dispatch(layout({ viewId: props.viewId, ...args })),
    doAddNode: args => dispatch(addNode(args, props)),
    doSetSelectedNodeTypes: nodeTypes =>
      dispatch(setSelectedNodeTypes(nodeTypes, props)),
    doToggleEditMode: () => dispatch(toggleEditMode({ viewId: props.viewId }))
  })
)(withStyles(styles, { withTheme: true })(GraphTab))
