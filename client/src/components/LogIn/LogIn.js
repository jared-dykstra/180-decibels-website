import Immutable from 'seamless-immutable'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

import AppBar from '@material-ui/core/AppBar'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import Register from './Register'
import SignIn from './SignIn'

class LogIn extends PureComponent {
  static propTypes = {
    signInText: PropTypes.string.isRequired,
    resetText: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)
    this.state = Immutable.from({
      registerMode: false
    })
  }

  toggleRegisterMode = value => {
    this.setState(state =>
      Immutable.from({
        registerMode: !state.registerMode
      })
    )
  }

  render() {
    const { registerMode } = this.state
    const { signInText, resetText } = this.props
    const submitLabel = signInText
    const resetLabel = resetText
    return [
      <AppBar position="relative" color="default">
        <Tabs
          onChange={this.toggleRegisterMode}
          fullWidth
          key="tabs"
          value={registerMode ? 1 : 0}
        >
          <Tab label="Returning User" />
          <Tab label="New User" />
        </Tabs>
      </AppBar>,
      <div key="body">
        {!registerMode && <SignIn {...{ submitLabel, resetLabel }} />}
        {registerMode && <Register {...{ submitLabel, resetLabel }} />}
      </div>
    ]
  }
}

export default LogIn
