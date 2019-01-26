import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { AppBar, Tab, Tabs, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import { Template } from 'components'

import { selectedNodeTypesSelector } from 'reduxStore/vast/vastSelectors'

import pageStyles from '../pageStyles'
import GraphTab from './GraphTab'

function TabContainer({ className, ...props }) {
  return (
    <Typography
      component="div"
      className={className}
      style={{
        padding: 8 * 3,
        backgroundColor: 'green'
      }}
    >
      {props.children}
    </Typography>
  )
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
}

const styles = theme => ({
  ...pageStyles({ theme, fullWidth: true, pagePadding: false }),
  root2: {
    display: 'flex',
    // Note: The following style is for IE only, which doesn't seem to respect backgroundColor: transparent
    '@media all and (-ms-high-contrast: none), (-ms-high-contrast: active)': {
      minHeight: 'calc(100vh - 70px)' // <== IE
    },
    flexDirection: 'column'
  },
  tab: {
    flexGrow: '1'
  },
  appBar: {}
})

class Vast extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    selectedNodeTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
    doLoad: PropTypes.func.isRequired,
    classes: PropTypes.objectOf(PropTypes.string).isRequired
  }

  constructor(props) {
    super(props)
    const { doLoad } = this.props
    doLoad()
    this.state = {
      value: 0
    }
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  render() {
    const { title, location, classes } = this.props
    const { value } = this.state
    return (
      <Template
        {...{
          title,
          location,
          className: `${classes.root} ${classes.root2}`,
          elevation: 0
        }}
      >
        {value === 0 && <GraphTab className={classes.tab} />}
        {value === 1 && (
          <TabContainer className={classes.tab}>Item Two</TabContainer>
        )}
        {value === 2 && (
          <TabContainer className={classes.tab}>Item Three</TabContainer>
        )}
        {value === 3 && (
          <TabContainer className={classes.tab}>Item Four</TabContainer>
        )}
        {value === 4 && (
          <TabContainer className={classes.tab}>Item Five</TabContainer>
        )}
        {value === 5 && (
          <TabContainer className={classes.tab}>Item Six</TabContainer>
        )}
        {value === 6 && (
          <TabContainer className={classes.tab}>Item Seven</TabContainer>
        )}
        <AppBar position="static" color="default" className={classes.appBar}>
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Item One" />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
            <Tab label="Item Four" />
            <Tab label="Item Five" />
            <Tab label="Item Six" />
            <Tab label="Item Seven" />
          </Tabs>
        </AppBar>
      </Template>
    )
  }
}

export default connect(
  state => ({
    selectedNodeTypes: selectedNodeTypesSelector(state)
  }),
  dispatch => ({
    doLoad: () => {} // dispatch(load())
  })
)(withStyles(styles)(Vast))
