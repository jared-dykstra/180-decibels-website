import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'

const Buttons = ({
  isSubmitDisabled,
  isResetDisabled,
  doCloseDialog,
  reset,
  cancelLabel,
  submitLabel,
  resetLabel
}) => (
  <DialogActions>
    <Button key="reset" type="reset" disabled={isResetDisabled} onClick={reset}>
      {resetLabel}
    </Button>
    <Button key="cancel" variant="contained" onClick={doCloseDialog}>
      {cancelLabel}
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
  doCloseDialog: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  submitLabel: PropTypes.string.isRequired,
  cancelLabel: PropTypes.string.isRequired,
  resetLabel: PropTypes.string.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  closeActionCreator: PropTypes.func.isRequired // <== Used in mapDispatchToProps
}

export default connect(
  () => ({}),
  (dispatch, props) => ({
    doCloseDialog: () => dispatch(props.closeActionCreator())
  })
)(Buttons)
