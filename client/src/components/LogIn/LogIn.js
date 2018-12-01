import Immutable from 'seamless-immutable'
import React, { PureComponent } from 'react'

import { Col, FormGroup, Input, Label, Row } from 'reactstrap'

import Register from './Register'
import SignIn from './SignIn'

const signInValue = 'signIn'
const registerValue = 'register'

class LogIn extends PureComponent {
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
        {!registerMode && <SignIn />}
        {registerMode && <Register />}
      </FormGroup>
    )
  }
}

export default LogIn
