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
  MenuItem,
  Paper
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import { Template } from 'components'

import { selectedNodeTypesSelector } from 'reduxStore/vast/vastSelectors'
import { addNode, setSelectedNodeTypes } from 'reduxStore/vast/vastActions'
import {
  NODE_TYPE_ACCOUNTABILITY,
  NODE_TYPE_PERSON,
  NODE_TYPE_PRIORITY
} from 'reduxStore/vast/vastConstants'

import Graph from './Graph'

const NODE_TYPE_LABELS = {
  [NODE_TYPE_ACCOUNTABILITY]: 'Accountability',
  [NODE_TYPE_PERSON]: 'Person',
  [NODE_TYPE_PRIORITY]: 'Priority'
}

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: theme.spacing.unit / 4
  }
})

class Vast extends PureComponent {
  static propTypes = {
    selectedNodeTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
    doAddNode: PropTypes.func.isRequired,
    doSetSelectedNodeTypes: PropTypes.func.isRequired
  }

  handleRemoveNodeType = value => {
    const { selectedNodeTypes, doSetSelectedNodeTypes } = this.props
    doSetSelectedNodeTypes(_without(selectedNodeTypes, value))
  }

  render() {
    const {
      location,
      selectedNodeTypes,
      doAddNode,
      doSetSelectedNodeTypes,
      classes
    } = this.props
    return (
      <Template
        {...{
          title: '180 Decibels - Vast',
          location
        }}
      >
        <h1>Vast</h1>
        <Paper>
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="flex-end"
            spacing={24}
          >
            <Grid item>
              <FormControl>
                <Button variant="contained" onClick={() => doAddNode()}>
                  Add Node
                </Button>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl>
                <InputLabel htmlFor="input-node-types">View</InputLabel>
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
                        />
                      ))}
                    </div>
                  )}
                  // MenuProps={MenuProps}
                >
                  {Object.entries(NODE_TYPE_LABELS).map(([k, v]) => (
                    <MenuItem key={k} value={k}>
                      {v}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Graph />
        </Paper>
      </Template>
    )
  }
}

export default connect(
  state => ({
    selectedNodeTypes: selectedNodeTypesSelector(state)
  }),
  dispatch => ({
    doAddNode: () => dispatch(addNode()),
    doSetSelectedNodeTypes: nodeTypes =>
      dispatch(setSelectedNodeTypes(nodeTypes))
  })
)(withStyles(styles, { withTheme: true })(Vast))
