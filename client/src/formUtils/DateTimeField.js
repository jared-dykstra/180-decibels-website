import React from 'react'
import { format, isValid, isWeekend } from 'date-fns'

import { InlineDateTimePicker } from 'material-ui-pickers'

import FormComponent from './FormComponent'

export default class DateTimeField extends FormComponent {
  render() {
    const {
      input: { onChange, value, ...inputProps },
      meta: { touched, error /* warning */ },
      label,
      id,
      keyboard = true,
      autoOk = true,
      showTabs = false,
      shouldDisableDate = date => isWeekend(date), // <== Disable weekends.  This property can be passed in if more control is needed
      dateFormat = 'E, LLL do, B', // <== See: https://date-fns.org/v2.0.0-alpha.26/docs/format
      ...custom
    } = this.props

    const hasError = touched && Boolean(error)

    //
    // This is a 'loose' date picker that allows a user to type in anything they want.  It doesn't have to be a parsable date
    //
    return (
      <InlineDateTimePicker
        {...{
          onChange: date => {
            if (dateFormat) {
              // When the user selects via the calendar, turn it into a user-friendly string
              if (isValid(date)) {
                return onChange(format(date, dateFormat))
              }
            }
            return date
          },
          id,
          label,
          error: hasError,
          helperText: hasError ? error : undefined,
          InputProps: {
            value,
            onChange,
            ...inputProps
          },
          autoOk,
          showTabs,
          keyboard,
          shouldDisableDate
        }}
        {...custom}
      />
    )
  }
}
