import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  Dialog,
  DialogContent,
  DialogContentText,
  Toolbar,
  AppBar,
  IconButton,
  Typography,
  withWidth
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import {
  getStartedModalIsOpenSelector,
  getStartedModalLinkTextSelector
} from 'reduxStore/getStarted/getStartedSelectors'
import { closeDialog } from 'reduxStore/getStarted/getStartedActions'

import { GetStarted } from 'components'

const GetStartedModal = ({ isModalOpen, linkText, doCloseDialog, width }) => (
  <Dialog
    open={isModalOpen}
    onClose={doCloseDialog}
    aria-labelledby="getStarted-dialog-title"
    fullScreen={width === 'xs' || width === 'sm'}
  >
    <AppBar key="tabs" position="relative" color="default">
      <Toolbar variant="dense">
        <div id="getStarted-dialog-title" style={{ flexGrow: 1 }}>
          Book a Free Clarity Session
        </div>
        <IconButton
          aria-label="Close"
          style={{ marginRight: -20 }}
          onClick={doCloseDialog}
        >
          <CloseIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
    <DialogContent style={{ marginTop: '1em' }}>
      {linkText && (
        <Typography align="center" color="secondary">
          {linkText}
        </Typography>
      )}
      <DialogContentText>
        A short conversation will help us understand your needs. You get tools
        that can improve your business right away.
      </DialogContentText>
      <GetStarted />
    </DialogContent>
  </Dialog>
)

GetStartedModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  linkText: PropTypes.string,
  doCloseDialog: PropTypes.func.isRequired,
  width: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']) // <== See https://material-ui.com/layout/breakpoints/#withwidth-options-higher-order-component
}

GetStartedModal.defaultProps = {
  linkText: null,
  // If SSR is used, width is not available
  width: 'lg'
}

export default connect(
  state => ({
    isModalOpen: getStartedModalIsOpenSelector(state),
    linkText: getStartedModalLinkTextSelector(state)
  }),
  dispatch => ({
    doCloseDialog: () => dispatch(closeDialog())
  })
)(withWidth()(GetStartedModal))
