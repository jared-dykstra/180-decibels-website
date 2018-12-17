import Immutable from 'seamless-immutable'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { Field } from 'redux-form/immutable'

import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import renderField from './renderField'

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

  initialState = Immutable.from({
    showPassword: false
  })

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  handleClickShowPassword = () => {
    this.setState(state =>
      Immutable.from({ showPassword: !state.showPassword })
    )
  }

  render = () => {
    const { label, formKey, placeholder, autoComplete, fullWidth } = this.props
    const { showPassword } = this.state
    return (
      <Field
        id={formKey}
        name={formKey}
        type={showPassword ? 'text' : 'password'}
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
