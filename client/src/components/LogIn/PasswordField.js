import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { Field } from 'redux-form/immutable'

import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import { renderField, FIELD_TYPE_TEXT, FIELD_TYPE_PASSWORD } from 'formUtils'

export default class PasswordField extends PureComponent {
  static propTypes = {
    formKey: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    autoComplete: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    fullWidth: PropTypes.bool
  }

  static defaultProps = {
    placeholder: undefined,
    fullWidth: true
  }

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
    const { label, formKey, placeholder, autoComplete, fullWidth } = this.props
    const { showPassword } = this.state
    return (
      <Field
        id={formKey}
        name={formKey}
        type={showPassword ? FIELD_TYPE_TEXT : FIELD_TYPE_PASSWORD}
        component={renderField}
        {...{ label, placeholder, autoComplete, fullWidth }}
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
