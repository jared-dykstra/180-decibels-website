import React, { Fragment } from 'react'
import { Input, FormFeedback, FormText } from 'reactstrap'

const renderTextField = ({
  input,
  meta: { touched, error, warning },
  ...custom
}) => (
  <Fragment>
    <Input
      {...(touched ? { valid: !error, invalid: !!error } : {})}
      {...input}
      {...custom}
    />
    {error && <FormFeedback>{error}</FormFeedback>}
    {!error && warning && <FormText>{warning}</FormText>}
  </Fragment>
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
