import React, { Component } from 'react'

import { Col, FormGroup, Input, Label, Row } from 'reactstrap'

import Register from './Register'
import SignIn from './SignIn'

const signInValue = 'signIn'
const registerValue = 'register'

class LogIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      registerMode: false
    }
  }

  setRegisterMode = value => {
    this.setState(() => ({
      registerMode: value === registerValue
    }))
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
              &nbsp;Sign In
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
              &nbsp;Register
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
