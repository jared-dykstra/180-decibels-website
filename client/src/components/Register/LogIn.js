import React, { Component } from 'react'

import { Col, FormGroup, Input, Label, Row } from 'reactstrap'

import Register from './Register'
import SignIn from './SignIn'

class LogIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      registerMode: false
    }
  }

  setRegisterMode = registerMode => {
    this.setState(() => ({
      registerMode
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
                name="signIn"
                onChange={() => this.setRegisterMode(false)}
                checked={!registerMode}
              />
              &nbsp;Sign In
            </Label>
          </Col>
          <Col>
            <Label check>
              <Input
                type="radio"
                name="signIn"
                onChange={() => this.setRegisterMode(true)}
                checked={registerMode}
              />
              &nbsp;Register
            </Label>
          </Col>
        </Row>
        {!registerMode && <SignIn />}
        {registerMode && <Register />}
      </FormGroup>
    )
  }
}

export default LogIn
