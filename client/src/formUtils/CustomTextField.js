import React from 'react'

import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'

import FormComponent from './FormComponent'

export default class CustomTextField extends FormComponent {
  render() {
    const {
      input,
      meta: { touched, error /* warning */ },
      label,
      id,
      fullWidth,
      ...custom
    } = this.props
    return (
      <FormControl
        {...{
          error: touched && !!error,
          'aria-describedby': `${id}-error-text`,
          fullWidth
        }}
      >
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <Input {...{ id, fullWidth }} {...input} {...custom} />
        <FormHelperText id={`${id}-error-text`}>
          {touched && error}
        </FormHelperText>
      </FormControl>
    )
  }
}
