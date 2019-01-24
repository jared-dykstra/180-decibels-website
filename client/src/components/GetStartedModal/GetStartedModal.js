import React, { PureComponent } from 'react'
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
import { withStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'

import {
  getStartedModalIsOpenSelector,
  getStartedModalLinkTextSelector
} from 'reduxStore/getStarted/getStartedSelectors'
import { closeDialog } from 'reduxStore/getStarted/getStartedActions'

import { GetStarted } from 'components'

const styles = theme => ({
  // TODO: This styling is replicated fro Template... Pull the style into a file that can be imported and shared
  root: {
    '& a': {
      textDecoration: 'none',
      color: theme.palette.primary.main
    },
    '& a:hover': {
      color: theme.palette.secondary.main
    }
  }
})

class GetStartedModal extends PureComponent {
  componentDidUpdate = prevProps => {
    const { isModalOpen, tracker, linkText } = this.props
    const { isModalOpen: prevIsModalOpen } = prevProps
    if (isModalOpen !== prevIsModalOpen && isModalOpen) {
      tracker.modalView({
        modalName: `getStarted${linkText ? `/${linkText}` : ''}`
      })
    }
  }

  render() {
    const { isModalOpen, linkText, doCloseDialog, width, classes } = this.props
    return (
      <Dialog
        open={isModalOpen}
        onClose={doCloseDialog}
        aria-labelledby="getStarted-dialog-title"
        fullScreen={width === 'xs' || width === 'sm'}
        className={classes.root}
      >
        <AppBar key="tabs" position="relative" color="default">
          <Toolbar variant="dense">
            <Typography
              variant="body1"
              id="getStarted-dialog-title"
              style={{ flexGrow: 1 }}
            >
              Book a Free Clarity Session
            </Typography>
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
            A short conversation will help us understand your needs. You get
            tools that can improve your business right away.
          </DialogContentText>
          <GetStarted />
        </DialogContent>
      </Dialog>
    )
  }
}

GetStartedModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  linkText: PropTypes.string,
  doCloseDialog: PropTypes.func.isRequired,
  width: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']), // <== See https://material-ui.com/layout/breakpoints/#withwidth-options-higher-order-component
  tracker: PropTypes.shape({
    modalView: PropTypes.func.isRequired
  }).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired
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
)(withWidth()(withStyles(styles)(GetStartedModal)))
