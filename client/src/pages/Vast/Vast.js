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
import { withStyles } from '@material-ui/core/styles'

import { Template } from 'components'

import { selectedNodeTypesSelector } from 'reduxStore/vast/vastSelectors'
import {
  load,
  layout,
  addNode,
  setSelectedNodeTypes
} from 'reduxStore/vast/vastActions'
import {
  NODE_TYPE_ACCOUNTABILITY,
  NODE_TYPE_PERSON,
  NODE_TYPE_PRIORITY
} from 'reduxStore/vast/vastConstants'

import pageStyles from '../pageStyles'
import Graph from './Graph'

const NODE_TYPE_LABELS = {
  [NODE_TYPE_ACCOUNTABILITY]: 'Accountability',
  [NODE_TYPE_PERSON]: 'Person',
  [NODE_TYPE_PRIORITY]: 'Priority'
}

const styles = theme => ({
  ...pageStyles({ theme, fullWidth: true, pagePadding: false }),
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
    title: PropTypes.string.isRequired,
    selectedNodeTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
    doLoad: PropTypes.func.isRequired,
    doAddNode: PropTypes.func.isRequired,
    doSetSelectedNodeTypes: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    const { doLoad } = this.props
    doLoad()
  }

  handleRemoveNodeType = value => {
    const { selectedNodeTypes, doSetSelectedNodeTypes } = this.props
    doSetSelectedNodeTypes(_without(selectedNodeTypes, value))
  }

  render() {
    const {
      title,
      location,
      selectedNodeTypes,
      doAddNode,
      doLayout,
      doSetSelectedNodeTypes,
      classes
    } = this.props
    return (
      <Template
        {...{
          title,
          location,
          className: classes.root
        }}
      >
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="flex-end"
          spacing={24}
        >
          <Grid item>
            <FormControl>
              <Button variant="contained" onClick={() => doLayout()}>
                Layout
              </Button>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl>
              <Button variant="contained" onClick={() => doAddNode()}>
                Add Priority
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
      </Template>
    )
  }
}

export default connect(
  state => ({
    selectedNodeTypes: selectedNodeTypesSelector(state)
  }),
  dispatch => ({
    doLoad: () => dispatch(load()),
    doLayout: () => dispatch(layout()),
    doAddNode: () => dispatch(addNode()),
    doSetSelectedNodeTypes: nodeTypes =>
      dispatch(setSelectedNodeTypes(nodeTypes))
  })
)(withStyles(styles, { withTheme: true })(Vast))
