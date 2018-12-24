import { get as _get } from 'lodash'

// Parses a GraphQL response
const getValidationErrors = response => {
  if (response.errors) {
    const firstError = response.errors[0]
    // Check for ValidationError
    const code = _get(firstError, 'extensions.code')
    if (code === 'BAD_USER_INPUT') {
      const field = _get(firstError, 'extensions.exception.invalidArgs[0]')
      if (field) {
        const errors = { [field]: firstError.message }
        return errors
      }
    } else {
      // Error cannot be associated with a specific user-input field.  Just return the first error as a string
      return firstError.message
    }
  }
  return null
}

export default getValidationErrors
