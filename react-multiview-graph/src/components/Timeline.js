import React, { PureComponent } from 'react'

import {
  Button,
  DialogActions,
  TextField,
  ClickAwayListener
} from '@material-ui/core'
import WorkIcon from '@material-ui/icons/Work'
import SaveIcon from '@material-ui/icons/SaveAlt'
import StarIcon from '@material-ui/icons/Star'
import { withStyles } from '@material-ui/core/styles'

import { VerticalTimeline } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'

import TimelineSegment from './TimelineSegment'

// TODO: Fork react-vertical-timeline and make styles easier to override
const styles = theme => ({
  '@global': {
    '.vertical-timeline-element-icon': {
      borderRadius: 'initial',
      boxShadow: 'initial',
      width: '48px!important',
      height: '48px!important',
      color: '#fff',

      // Undo everything applied by ".vertical-timeline-element-icon svg"
      '& svg': {
        width: '1em!important',
        height: '1em!important',
        display: 'inline-block!important',
        // position: 'initial',
        left: 'auto!important',
        top: 'auto!important',
        marginLeft: '0px!important',
        marginTop: '0px!important'
      }
    },
    '.vertical-timeline-element-content': {
      paddingTop: '0em!important'
    }
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
    overflow: 'auto'
  }
})

const timeline = [
  {
    date: 'Feb 6, 2019',
    heading: 'Hired Oscar',
    description: `Planning changes when Oscar joins. Oscar will manage outsourced IT and Software processes. Oscar to be informed regarding the 90 day rock to hire new programmers`
  },
  {
    date: 'Feb 4, 2019',
    heading: 'Weekly Meeting Update',
    description: `Expanded Wanda's role: Assigned 90 day rocks - User Experience, Visual Design`
  },
  {
    date: 'Jan 28, 2019',
    heading: 'Weekly Meeting Update',
    description: `Added 90 day rock (AKA "priority") to hire 2 programmers. Assigned to Brent`
  },
  {
    date: 'Jan 21, 2019',
    heading: 'Weekly Meeting Update',
    description: `No significant change; on track`
  },
  {
    date: 'Jan 14, 2019',
    heading: 'Weekly Meeting Update',
    description: 'Resetting 90 day rocks (AKA "priority") after the holidays'
  }
]

class Timeline extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isCreating: false,
      newRevName: '',
      newRevDesc: ''
    }
  }

  handleChange = name => event => {
    const { value } = event.target
    this.setState(() => ({ [name]: value }))
  }

  handleClose = e => {
    e.stopPropagation()
    this.setState(() => ({ isCreating: false }))
  }

  handleSave = e => {
    e.stopPropagation()
    console.log('TODO - Save Changes')
  }

  handleSelectRevision = e => {
    console.log('TODO - Select revision')
  }

  render() {
    const { classes } = this.props
    const { isCreating, newRevName, newRevDesc } = this.state

    const renderNew = () => {
      if (!isCreating) {
        return [
          <h3 key="header">Click to Save a new revision</h3>,
          <p key="description">
            Include a description: What changes were made and why
          </p>
        ]
      }

      const canSave = newRevName && newRevDesc

      return (
        <ClickAwayListener key="fields" onClickAway={this.handleClose}>
          <div>
            <TextField
              label="Name"
              placeholder="Name this revision"
              className={classes.textField}
              required
              onChange={this.handleChange('newRevName')}
              value={newRevName}
            />
            <TextField
              label="Description"
              placeholder="Include a description: What changes were made and why"
              multiline
              className={classes.textField}
              required
              rows={2}
              onChange={this.handleChange('newRevDesc')}
              value={newRevDesc}
            />
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button
                onClick={this.handleSave}
                color="primary"
                disabled={!canSave}
              >
                Save
              </Button>
            </DialogActions>
          </div>
        </ClickAwayListener>
      )
    }

    return (
      <VerticalTimeline layout="1-column">
        <TimelineSegment
          {...{
            key: `save_${isCreating}`,
            icon: <SaveIcon />,
            color: 'primary',
            onClick: () => this.setState(() => ({ isCreating: true })),
            active: isCreating
          }}
        >
          {renderNew()}
        </TimelineSegment>

        {timeline.map(({ date, heading, description }) => (
          <TimelineSegment
            {...{
              key: date,
              icon: <WorkIcon />,
              color: 'secondary',
              onClick: this.handleSelectRevision,
              date
            }}
          >
            <h3>{heading}</h3>
            <p>{description}</p>
          </TimelineSegment>
        ))}

        <TimelineSegment
          {...{
            key: 'start',
            icon: <StarIcon />,
            color: 'default',
            date: 'Nov 1, 2018'
          }}
        >
          <h3>Created</h3>
        </TimelineSegment>
      </VerticalTimeline>
    )
  }
}

export default withStyles(styles)(Timeline)
