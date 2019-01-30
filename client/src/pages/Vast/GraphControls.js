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

import { selectedNodeTypesSelector } from 'reduxStore/vast/vastSelectors'
import {
  layout,
  addNode,
  setSelectedNodeTypes
} from 'reduxStore/vast/vastActions'
import {
  NODE_TYPE_ACCOUNTABILITY,
  NODE_TYPE_PERSON,
  NODE_TYPE_PRIORITY
} from 'reduxStore/vast/vastConstants'

const NODE_TYPE_LABELS = {
  [NODE_TYPE_ACCOUNTABILITY]: 'Accountability',
  [NODE_TYPE_PERSON]: 'Person',
  [NODE_TYPE_PRIORITY]: 'Priority'
}

const styles = theme => ({
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: theme.spacing.unit / 4
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

  handleRemoveNodeType = value => {
    const { selectedNodeTypes, doSetSelectedNodeTypes } = this.props
    doSetSelectedNodeTypes(_without(selectedNodeTypes, value))
  }

  render() {
    const {
      selectedNodeTypes,
      doAddNode,
      doLayout,
      doSetSelectedNodeTypes,
      className,
      classes
    } = this.props
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
      </Grid>
    )
  }
}

export default connect(
  (state, props) => ({
    selectedNodeTypes: selectedNodeTypesSelector(state, props)
  }),
  (dispatch, props) => ({
    doLayout: () => dispatch(layout(props)),
    doAddNode: () => dispatch(addNode(props)),
    doSetSelectedNodeTypes: nodeTypes =>
      dispatch(setSelectedNodeTypes(nodeTypes, props))
  })
)(withStyles(styles, { withTheme: true })(GraphTab))
