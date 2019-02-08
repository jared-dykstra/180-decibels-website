import uuid from 'uuid/v4'
import { without as _without } from 'lodash'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Chip,
  Button,
  Grid,
  FormControl,
  Input,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core'

import { SpeedDial, SpeedDialAction } from '@material-ui/lab'
import SpeedDialIcon from '@material-ui/icons/Loop'
import GridIcon from '@material-ui/icons/DragIndicator'
import CircularIcon from '@material-ui/icons/BlurCircular'
import ConcentricIcon from '@material-ui/icons/GpsFixed'
import ShareIcon from '@material-ui/icons/Share'
import TreeIcon from '@material-ui/icons/DeviceHub'

import { withStyles } from '@material-ui/core/styles'

import { selectedNodeTypesSelector } from 'reduxStore/vast/vastSelectors'
import {
  layout,
  addNode,
  setSelectedNodeTypes
} from 'reduxStore/vast/vastActions'
import {
  NODE_TYPE_PRIORITY,
  NODE_TYPE_CLASS_MAP
} from 'reduxStore/vast/vastConstants'

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
      layoutOpen: false
    }
  }

  handleRemoveNodeType = value => {
    const { selectedNodeTypes, doSetSelectedNodeTypes } = this.props
    doSetSelectedNodeTypes(_without(selectedNodeTypes, value))
  }

  handleLayoutClick = (e, opts) => {
    const { doLayout } = this.props
    if (layout) {
      doLayout({ forceUpdate: true, opts })
    }
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

  render() {
    const {
      selectedNodeTypes,
      doAddNode,
      doSetSelectedNodeTypes,
      className,
      classes
    } = this.props
    const { layoutOpen } = this.state
    const layoutActions = [
      {
        icon: <ShareIcon />,
        name: 'Graph',
        layout: {
          name: 'cola'
        }
      },
      {
        icon: <CircularIcon />,
        name: 'Circular',
        layout: {
          name: 'circle',
          nodeDimensionsIncludeLabels: true,
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
          nodeDimensionsIncludeLabels: true,
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
          <FormControl>
            <InputLabel htmlFor="input-node-types">Filter</InputLabel>
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
              // MenuProps={MenuProps}
            >
              {Object.entries(NODE_TYPE_CLASS_MAP).map(([k, v]) => (
                <MenuItem key={k} value={k} style={{ color: v.color }}>
                  {k}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
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
            ButtonProps={{ color: 'secondary' }}
          >
            {layoutActions.map(action => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={e => this.handleLayoutClick(e, action.layout)}
              />
            ))}
          </SpeedDial>
        </Grid>
        <Grid item>
          <FormControl>
            <Button
              variant="contained"
              onClick={() =>
                doAddNode({
                  nodeId: uuid(),
                  label: 'New Priority',
                  type: NODE_TYPE_PRIORITY
                })
              }
            >
              Add Priority
            </Button>
          </FormControl>
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
