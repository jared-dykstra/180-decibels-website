import Immutable from 'seamless-immutable'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import CloseIcon from '@material-ui/icons/Close'
import Toolbar from '@material-ui/core/Toolbar'
import { withStyles } from '@material-ui/core/styles'

import { closeDialog } from 'reduxStore/auth/authActions'

import Register from './Register'
import SignIn from './SignIn'

const TAB_REGISTER = 'register'
const TAB_LOGIN = 'login'

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: -20
  }
}

class LogIn extends PureComponent {
  static propTypes = {
    signInText: PropTypes.string.isRequired,
    registerText: PropTypes.string.isRequired,
    cancelText: PropTypes.string.isRequired,
    resetText: PropTypes.string.isRequired,
    doCloseDialog: PropTypes.func.isRequired,
    classes: PropTypes.objectOf(PropTypes.string).isRequired
  }

  constructor(props) {
    super(props)
    this.state = Immutable.from({
      activeTab: TAB_LOGIN
    })
  }

  handleChangeTab = (event, value) => {
    this.setState(state =>
      Immutable.from({
        activeTab: value
      })
    )
  }

  render() {
    const { activeTab } = this.state
    const {
      classes,
      signInText,
      registerText,
      resetText: resetLabel,
      cancelText: cancelLabel,
      doCloseDialog
    } = this.props
    const submitLabel = signInText
    return [
      <AppBar key="tabs" position="relative" color="default">
        <Toolbar variant="dense">
          <Tabs
            onChange={this.handleChangeTab}
            key="tabs"
            value={activeTab}
            className={classes.grow}
          >
            <Tab value={TAB_LOGIN} label={signInText} />
            <Tab value={TAB_REGISTER} label={registerText} />
          </Tabs>
          <IconButton
            aria-label="Close"
            className={classes.menuButton}
            onClick={doCloseDialog}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>,
      activeTab === TAB_LOGIN && (
        <SignIn key="signIn" {...{ submitLabel, cancelLabel, resetLabel }} />
      ),
      activeTab === TAB_REGISTER && (
        <Register
          key="register"
          {...{ submitLabel, cancelLabel, resetLabel }}
        />
      )
    ]
  }
}

export default connect(
  () => ({}),
  dispatch => ({
    doCloseDialog: () => dispatch(closeDialog())
  })
)(withStyles(styles)(LogIn))
