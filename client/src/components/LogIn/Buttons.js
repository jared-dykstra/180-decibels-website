import React from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'

import styles from './LogIn.module.scss'

const Buttons = ({
  isSubmitDisabled,
  isResetDisabled,
  reset,
  submitLabel,
  resetLabel
}) => (
  <DialogActions className={styles.buttons}>
    <Button key="reset" type="reset" disabled={isResetDisabled} onClick={reset}>
      {resetLabel}
    </Button>
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
  reset: PropTypes.func.isRequired,
  submitLabel: PropTypes.string.isRequired,
  resetLabel: PropTypes.string.isRequired
}

export default Buttons
