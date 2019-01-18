import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core'

import { Template } from 'components'

import { selectedGroupSelector } from 'reduxStore/vast/vastSelectors'
import { addNode, setSelectedGroup } from 'reduxStore/vast/vastActions'
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

class Vast extends PureComponent {
  static propTypes = {
    selectedGroup: PropTypes.string,
    doAddNode: PropTypes.func.isRequired,
    doSetSelectedGroup: PropTypes.func.isRequired
  }

  static defaultProps = {
    selectedGroup: ''
  }

  render() {
    const {
      location,
      selectedGroup,
      doAddNode,
      doSetSelectedGroup
    } = this.props
    return (
      <Template
        {...{
          title: '180 Decibels - Vast',
          location
        }}
      >
        <h1>Vast</h1>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="flex-end"
          spacing={24}
        >
          <Grid item>
            <Button variant="contained" onClick={() => doAddNode()}>
              Add Node
            </Button>
          </Grid>
          <Grid item>
            <FormControl>
              <InputLabel htmlFor="input-group">Group</InputLabel>
              <Select
                value={selectedGroup}
                onChange={e => doSetSelectedGroup(e.target.value)}
                inputProps={{
                  name: 'group',
                  id: 'input-group'
                }}
              >
                <MenuItem value="">
                  <em>Choose a Group</em>
                </MenuItem>
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
    selectedGroup: selectedGroupSelector(state)
  }),
  dispatch => ({
    doAddNode: () => dispatch(addNode()),
    doSetSelectedGroup: group => dispatch(setSelectedGroup({ group }))
  })
)(Vast)
