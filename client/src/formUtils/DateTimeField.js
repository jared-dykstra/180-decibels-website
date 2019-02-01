import React from 'react'
import { addDays, format, isValid, isWeekend } from 'date-fns'
import { InlineDateTimePicker } from 'material-ui-pickers'
import LeftArrowIcon from '@material-ui/icons/ChevronLeft'
import RightArrowIcon from '@material-ui/icons/ChevronRight'
import DateRangeIcon from '@material-ui/icons/DateRange'
import TimeIcon from '@material-ui/icons/AccessTime'
import KeyboardIcon from '@material-ui/icons/CalendarToday'

import FormComponent from './FormComponent'

// Disable weekends.  The logic can be extended if/as needed, eg. by using a free/busy iCal
const isAvailable = date => !isWeekend(date)

const nextAvailable = (date = new Date()) => {
  let next = date
  do {
    next = addDays(next, 1)
  } while (!isAvailable(next))
  return next
}

// Intentionally *not* validating free-form text input--If that's needed, a new property or second field type should be created
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
      shouldDisableDate = date => !isAvailable(date),
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
          leftArrowIcon: <LeftArrowIcon />,
          rightArrowIcon: <RightArrowIcon />,
          dateRangeIcon: <DateRangeIcon />,
          timeIcon: <TimeIcon />,
          keyboardIcon: <KeyboardIcon />,
          id,
          label,
          error: hasError,
          helperText: hasError ? error : undefined,
          InputProps: {
            value: value || format(nextAvailable(), dateFormat),
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
