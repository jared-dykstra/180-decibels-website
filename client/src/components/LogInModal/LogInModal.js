import Immutable from 'seamless-immutable'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'

import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import { withStyles } from '@material-ui/core/styles'

import {
  isAuthenticatingSelector,
  signInModalIsOpenSelector,
  isSignedInSelector,
  nameSelector
} from 'reduxStore/auth/authSelectors'
import { closeDialog, openDialog, signOut } from 'reduxStore/auth/authActions'
import { LogIn } from 'components'

import styles from './LogInModal.module.scss'

const muiStyles = {
  paper: {
    // Preserve width on small screens.  maxWidth kicks in on 'md' screens
    margin: 0
  }
}

class LogInModal extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    isAuthenticating: PropTypes.bool.isRequired,
    isModalOpen: PropTypes.bool.isRequired,
    doCloseDialog: PropTypes.func.isRequired,
    doOpenDialog: PropTypes.func.isRequired,
    doSignOut: PropTypes.func.isRequired,
    isSignedIn: PropTypes.bool.isRequired,
    name: PropTypes.string,
    classes: PropTypes.objectOf(PropTypes.string).isRequired
  }

  static defaultProps = {
    name: null,
    className: undefined
  }

  constructor(props) {
    super(props)
    this.state = Immutable.from({
      menuOpen: false
    })
  }

  toggleModal = () => {
    const { isModalOpen, doCloseDialog, doOpenDialog } = this.props
    if (isModalOpen) {
      doCloseDialog()
    } else {
      doOpenDialog()
    }
  }

  toggleMenu = () => {
    this.setState(prevState =>
      Immutable.from({
        dropdownOpen: !prevState.dropdownOpen
      })
    )
  }

  renderSignInButton = () => {
    const { isModalOpen, classes } = this.props
    const signInText = 'Sign In'
    return [
      <Button key="button" color="primary" outline onClick={this.toggleModal}>
        <FontAwesomeIcon icon={faUser} />
        &nbsp;
        {signInText}
      </Button>,
      // TODO: Split the modal into a separate component to avoid any chance of it being included in the DOM multiple times
      <Dialog
        key="modal"
        open={isModalOpen}
        onClose={this.toggleModal}
        fullWidth
        classes={classes}
      >
        <DialogContent>
          <LogIn
            signInText={signInText}
            registerText="Register"
            cancelText="Cancel"
            resetText="Reset"
          />
        </DialogContent>
      </Dialog>
    ]
  }

  renderUserButton = () => {
    const { name, doSignOut } = this.props
    const { dropdownOpen } = this.state
    return (
      // TODO: Replace Bootstrap Dropdown with material-ui select
      <Dropdown
        isOpen={dropdownOpen}
        toggle={this.toggleMenu}
        inNavbar
        className={styles['profile-button']}
      >
        <DropdownToggle tag="a" className="nav-link" caret>
          <FontAwesomeIcon icon={faUser} />
          &nbsp;{name}
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem disabled>Change Password</DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={doSignOut}>Sign Out</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    )
  }

  render = () => {
    const { isAuthenticating, isSignedIn, className } = this.props
    // During the authentication process, it's unclear whether to display a login button or not, so display nothing
    return (
      <span className={className}>
        {!isAuthenticating &&
          (isSignedIn ? this.renderUserButton() : this.renderSignInButton())}
      </span>
    )
  }
}

export default connect(
  (state /* , ownProps */) => ({
    isAuthenticating: isAuthenticatingSelector(state),
    isModalOpen: signInModalIsOpenSelector(state),
    isSignedIn: isSignedInSelector(state),
    name: nameSelector(state)
  }),
  dispatch => ({
    doCloseDialog: () => dispatch(closeDialog()),
    doOpenDialog: () => dispatch(openDialog()),
    doSignOut: () => dispatch(signOut())
  })
)(withStyles(muiStyles)(LogInModal))
