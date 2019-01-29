import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import Graph from './Graph'
import GraphControls from './GraphControls'

const styles = theme => ({
  graphContainer: {
    position: 'relative',
    overdlow: 'hidden'
  },
  graph: {
    position: 'absolute',
    top: '0'
  },
  controls: {
    paddingLeft: theme.spacing.unit * 2,
    position: 'absolute',
    top: '0',
    pointerEvents: 'none',
    '&>div': {
      pointerEvents: 'auto'
    },
    minHeight: '50%',
    width: 'auto',
    maxWidth: '25%'
  }
})

const GraphTab = ({ viewId, className, classes }) => (
  <div className={`${className} ${classes.graphContainer}`}>
    <Graph viewId={viewId} className={classes.graph} />
    <GraphControls viewId={viewId} className={classes.controls} />
  </div>
)

GraphTab.propTypes = {
  viewId: PropTypes.string.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  className: PropTypes.string
}

GraphTab.defaultProps = {
  className: ''
}

export default withStyles(styles)(GraphTab)
