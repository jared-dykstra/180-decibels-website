import Immutable from 'seamless-immutable'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

import { Col, FormGroup, Input, Label, Row } from 'reactstrap'

import Register from './Register'
import SignIn from './SignIn'

const signInValue = 'signIn'
const registerValue = 'register'

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

  setRegisterMode = value => {
    this.setState(() =>
      Immutable.from({
        registerMode: value === registerValue
      })
    )
  }

  render() {
    const { registerMode } = this.state
    const { signInText, resetText } = this.props
    const submitLabel = signInText
    const resetLabel = resetText
    return (
      <FormGroup check>
        <Row>
          <Col>
            <Label check>
              <Input
                type="radio"
                value={signInValue}
                onChange={e => this.setRegisterMode(e.target.value)}
                checked={!registerMode}
              />
              &nbsp;Returning User
            </Label>
          </Col>
          <Col>
            <Label check>
              <Input
                type="radio"
                value={registerValue}
                onChange={e => this.setRegisterMode(e.target.value)}
                checked={registerMode}
              />
              &nbsp;New User
            </Label>
          </Col>
        </Row>
        <hr />
        {!registerMode && <SignIn {...{ submitLabel, resetLabel }} />}
        {registerMode && <Register {...{ submitLabel, resetLabel }} />}
      </FormGroup>
    )
  }
}

export default LogIn
