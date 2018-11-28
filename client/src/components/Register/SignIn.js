import React from 'react'

import { Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'

import styles from './LogIn.module.scss'
import { labelWidth } from './constants'
import Buttons from './Buttons'

export default () => (
  <Form className={styles['sign-in']}>
    <FormGroup>
      <Row>
        <Col xs={labelWidth}>
          <Label for="signInEmail" className={styles.required}>
            Email
          </Label>
        </Col>
        <Col>
          <Input
            type="email"
            name="email"
            id="signInEmail"
            placeholder="user@domain.com"
            autoComplete="email"
          />
        </Col>
      </Row>
    </FormGroup>
    <FormGroup>
      <Row>
        <Col xs={labelWidth}>
          <Label for="signInPassword" className={styles.required}>
            Password
          </Label>
        </Col>
        <Col>
          <Input
            type="password"
            name="password"
            id="signInPassword"
            placeholder="password placeholder"
            autoComplete="current-password"
          />
        </Col>
      </Row>
    </FormGroup>
    <Buttons
      {...{ isSubmitDisabled: false, isResetDisabled: true, reset: () => {} }}
    />
  </Form>
)
