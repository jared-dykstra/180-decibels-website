import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import { getStartedModalIsOpenSelector } from 'reduxStore/getStarted/getStartedSelectors'
import { toggleDialog } from 'reduxStore/getStarted/getStartedActions'

import { DialogFormButtons } from '..'

import GetStarted from './GetStarted'

const GetStartedModal = ({ isModalOpen, doToggleDialog }) => (
  <Dialog
    open={isModalOpen}
    onClose={doToggleDialog}
    aria-labelledby="getStarted-dialog-title"
  >
    <DialogTitle id="getStarted-dialog-title">
      Book a free Clarity Session today
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
        A 15 minute conversation will help us understand your needs. Your
        Clarity Session helps us understand your needs. You get tools that can
        improve your business right away.
      </DialogContentText>
      <GetStarted />
    </DialogContent>
    <DialogFormButtons
      {...{
        isSubmitDisabled: false,
        isResetDisabled: false,
        reset: () => {},
        submitLabel: 'OK',
        cancelLabel: 'cancel',
        resetLabel: 'reset',
        closeActionCreator: toggleDialog
      }}
    />
  </Dialog>
)

GetStartedModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  doToggleDialog: PropTypes.func.isRequired
}

export default connect(
  state => ({
    isModalOpen: getStartedModalIsOpenSelector(state)
  }),
  dispatch => ({
    doToggleDialog: () => dispatch(toggleDialog())
  })
)(GetStartedModal)
