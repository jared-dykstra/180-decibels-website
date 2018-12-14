import React from 'react'

import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'

const renderTextField = ({
  input,
  meta: { touched, error, warning },
  label,
  id,
  fullWidth,
  ...custom
}) => (
  <FormControl
    error={touched && !!error}
    aria-describedby={`${id}-error-text`}
    {...{ fullWidth }}
  >
    <InputLabel htmlFor={id}>{label}</InputLabel>
    <Input {...{ id, fullWidth }} {...input} {...custom} />
    <FormHelperText id={`${id}-error-text`}>{touched && error}</FormHelperText>
  </FormControl>
)

// const renderRadioField = ({ value, input, ...custom }) => (
//   <Input type="radio" checked={value === input.value} {...input} {...custom} />
// )

// const renderCheckbox = ({ input: { value, onChange } }) => (
//   <Input type="checkbox" checked={!!value} onChange={onChange} />
// )

const renderSelectField = ({
  input,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <Input
    type="select"
    {...(touched ? { valid: !error, invalid: !!error } : {})}
    {...input}
    {...custom}
  >
    {children}
  </Input>
)

export default props => {
  // See: https://github.com/reactstrap/reactstrap/issues/707#issuecomment-351593584
  const { type } = props
  switch (type) {
    case 'password':
    case 'text':
      return renderTextField(props)
    // case 'radio':
    //   return renderRadioField(rest)
    // case 'checkbox':
    //   return renderCheckbox(rest)
    case 'select':
      return renderSelectField(props)
    default:
      throw new Error(
        `Unrecognized type: "${type}".  Augment renderField to render the new type`
      )
  }
}
