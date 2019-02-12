import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Fab } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import { VerticalTimelineElement } from 'react-vertical-timeline-component'

const styles = (/* theme */) => ({
  panelHover: {
    '@global': {
      '.vertical-timeline-element-content': {
        cursor: 'pointer',
        // TODO: This is a pale yellow color which should be put in the theme
        backgroundColor: '#FFFFE0',
        transition:
          // Replicated from MUI's FAB
          'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
      }
    }
  },
  fabPrimaryHover: {
    // TODO: Should be able to get the secondary/primary button hover colors from the theme?
    backgroundColor: 'rgba(37, 144, 152)'
  },
  fabSecondaryHover: {
    backgroundColor: 'rgb(102, 18, 10)'
  }
})

class TimelineSegment extends PureComponent {
  static propTypes = {
    active: PropTypes.bool,
    icon: PropTypes.node.isRequired,
    color: PropTypes.string.isRequired,
    date: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func,
    classes: PropTypes.objectOf(PropTypes.string).isRequired
  }

  static defaultProps = {
    active: false,
    children: null,
    date: undefined,
    onClick: () => {}
  }

  constructor(props) {
    super(props)
    this.state = {
      isHovering: false
    }
  }

  render() {
    const { active, classes, icon, color, date, onClick, children } = this.props
    const { isHovering } = this.state
    const highlighted = active || isHovering
    return (
      <VerticalTimelineElement
        className={highlighted ? classes.panelHover : undefined}
        date={date}
        icon={
          <Fab
            classes={{
              primary: highlighted ? classes.fabPrimaryHover : undefined,
              secondary: highlighted ? classes.fabSecondaryHover : undefined
            }}
            size="medium"
            color={color}
            onMouseEnter={() => {
              this.setState(() => ({ isHovering: true }))
            }}
            onMouseLeave={() => {
              this.setState(() => ({ isHovering: false }))
            }}
            onClick={onClick}
          >
            {icon}
          </Fab>
        }
      >
        {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
        <div
          onMouseEnter={() => {
            this.setState(() => ({ isHovering: true }))
          }}
          onMouseLeave={() => {
            this.setState(() => ({ isHovering: false }))
          }}
          onClick={onClick}
          onKeyPress={onClick}
          role="button"
        >
          {children}
        </div>
      </VerticalTimelineElement>
    )
  }
}

export default withStyles(styles)(TimelineSegment)
