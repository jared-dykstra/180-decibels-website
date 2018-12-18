import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'

import { getStartedModalIsOpenSelector } from 'reduxStore/getStarted/getStartedSelectors'
import { toggleDialog } from 'reduxStore/getStarted/getStartedActions'

import { DialogFormButtons } from '..'

import GetStarted from './GetStarted'

const styles = {
  container: {
    // Position the dialog near the top--the default is to center vertically
    'align-items': 'baseline',
    // TODO: See about a smaller margin-top on xs devices
    'margin-top': '93px'
  },
  paper: {
    // Preserve width on small screens.  maxWidth kicks in on 'md' screens
    margin: 0
  }
}

const GetStartedModal = ({ isModalOpen, doToggleDialog, classes }) => (
  <Dialog
    open={isModalOpen}
    onClose={doToggleDialog}
    aria-labelledby="getStarted-dialog-title"
    fullWidth
    classes={classes}
  >
    <AppBar key="tabs" position="relative" color="default">
      <Toolbar variant="dense">
        <div id="getStarted-dialog-title" style={{ flexGrow: 1 }}>
          Book a Free Clarity Session
        </div>
        <IconButton
          aria-label="Close"
          style={{ marginRight: -20 }}
          onClick={doToggleDialog}
        >
          <CloseIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
    <DialogContent style={{ marginTop: '1em' }}>
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
)(withStyles(styles)(GetStartedModal))
