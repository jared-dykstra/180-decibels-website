import React from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'

const Buttons = ({
  isSubmitDisabled,
  isResetDisabled,
  doCloseDialog,
  reset,
  cancelLabel,
  submitLabel,
  resetLabel,
  style
}) => (
  <DialogActions style={style}>
    <Button key="reset" type="reset" disabled={isResetDisabled} onClick={reset}>
      {resetLabel}
    </Button>
    {cancelLabel && (
      <Button key="cancel" variant="contained" onClick={doCloseDialog}>
        {cancelLabel}
      </Button>
    )}
    <Button
      key="submit"
      variant="contained"
      type="submit"
      color={!isSubmitDisabled ? 'primary' : undefined}
      disabled={isSubmitDisabled}
    >
      {submitLabel}
    </Button>
  </DialogActions>
)

Buttons.propTypes = {
  isSubmitDisabled: PropTypes.bool.isRequired,
  isResetDisabled: PropTypes.bool.isRequired,
  doCloseDialog: PropTypes.func,
  reset: PropTypes.func.isRequired,
  submitLabel: PropTypes.string.isRequired,
  cancelLabel: PropTypes.string,
  resetLabel: PropTypes.string.isRequired,
  style: PropTypes.objectOf(PropTypes.string)
}

Buttons.defaultProps = {
  doCloseDialog: () => {},
  cancelLabel: undefined,
  style: {}
}

export default Buttons
