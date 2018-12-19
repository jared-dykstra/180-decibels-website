import React from 'react'

import CustomTextField from './CustomTextField'
import DateTimeField from './DateTimeField'
import PasswordField from './PasswordField'

import { FIELD_TYPE_PASSWORD, FIELD_TYPE_TEXT, FIELD_TYPE_DATE_TIME } from '.'

// const renderRadioField = ({ value, input, ...custom }) => (
//   <Input type="radio" checked={value === input.value} {...input} {...custom} />
// )

// const renderCheckbox = ({ input: { value, onChange } }) => (
//   <Input type="checkbox" checked={!!value} onChange={onChange} />
// )

// const renderSelectField = ({
//   input,
//   meta: { touched, error },
//   children,
//   ...custom
// }) => (
//   <Input
//     type="select"
//     {...(touched ? { valid: !error, invalid: !!error } : {})}
//     {...input}
//     {...custom}
//   >
//     {children}
//   </Input>
// )

export default props => {
  // See: https://github.com/reactstrap/reactstrap/issues/707#issuecomment-351593584
  const { type } = props
  switch (type) {
    case FIELD_TYPE_PASSWORD:
      return <PasswordField {...props} />
    case FIELD_TYPE_TEXT:
      return <CustomTextField {...props} />
    // case 'radio':
    //   return renderRadioField(rest)
    // case 'checkbox':
    //   return renderCheckbox(rest)
    // case 'select':
    //   return renderSelectField(props)
    case FIELD_TYPE_DATE_TIME:
      return <DateTimeField {...props} />
    default:
      throw new Error(
        `Unrecognized type: "${type}".  Augment renderField to render the new type`
      )
  }
}
