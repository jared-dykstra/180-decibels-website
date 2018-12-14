import Immutable from 'seamless-immutable'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import Register from './Register'
import SignIn from './SignIn'

const TAB_REGISTER = 'register'
const TAB_LOGIN = 'login'

class LogIn extends PureComponent {
  static propTypes = {
    signInText: PropTypes.string.isRequired,
    resetText: PropTypes.string.isRequired
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
    const { signInText, resetText } = this.props
    const submitLabel = signInText
    const resetLabel = resetText
    return [
      <AppBar key="tabs" position="relative" color="default">
        <Tabs onChange={this.handleChangeTab} key="tabs" value={activeTab}>
          <Tab value={TAB_LOGIN} label="Returning User" />
          <Tab value={TAB_REGISTER} label="New User" />
        </Tabs>
      </AppBar>,
      activeTab === TAB_LOGIN && (
        <SignIn key="signIn" {...{ submitLabel, resetLabel }} />
      ),
      activeTab === TAB_REGISTER && (
        <Register key="register" {...{ submitLabel, resetLabel }} />
      )
    ]
  }
}

export default LogIn
