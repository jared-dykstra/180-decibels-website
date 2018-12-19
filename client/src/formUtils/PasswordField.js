import React from 'react'

import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import { FIELD_TYPE_TEXT, FIELD_TYPE_PASSWORD } from 'formUtils'

import FormComponent from './FormComponent'
import CustomTextField from './CustomTextField'

/* eslint-disable react/no-this-in-sfc */
export default class PasswordField extends FormComponent {
  initialState = {
    showPassword: false
  }

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }))
  }

  render = () => {
    const { type, ...custom } = this.props
    const { showPassword } = this.state
    return (
      <CustomTextField
        type={showPassword ? FIELD_TYPE_TEXT : FIELD_TYPE_PASSWORD}
        {...custom}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="Toggle password visibility"
              onClick={this.handleClickShowPassword}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
    )
  }
}
