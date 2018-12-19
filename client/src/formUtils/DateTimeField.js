import React from 'react'
import { format, isValid } from 'date-fns'

import { InlineDateTimePicker } from 'material-ui-pickers'
import { IconButton, InputAdornment } from '@material-ui/core'
import CalendarIcon from '@material-ui/icons/CalendarTodayTwoTone'

import FormComponent from './FormComponent'

export default class DateTimeField extends FormComponent {
  render() {
    const {
      input,
      meta: { touched, error /* warning */ },
      label,
      id,
      value,
      ...custom
    } = this.props

    const hasError = touched && Boolean(error)
    const formatDate = date =>
      date && isValid(date) ? format(date, 'E, LLL do, B') : undefined

    return (
      <InlineDateTimePicker
        {...{
          id,
          label,
          error: hasError,
          labelFunc: formatDate,
          helperText: hasError ? error : undefined,
          shouldDisableDate: date => {
            // Exclude Weekends
            const dayOfWeek = format(date, 'i')
            return dayOfWeek > 5
          },
          InputProps: {
            value: formatDate(input.value) || '',
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <CalendarIcon />
                </IconButton>
              </InputAdornment>
            )
          },
          autoOk: true,
          showTabs: false,
          allowKeyboardControl: false
        }}
        {...input}
        {...custom}
      />
    )
  }
}
