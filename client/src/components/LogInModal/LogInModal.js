import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// NOTE: Have to import bootstrap theme to get this to work.  TODO: Completely remove reactstrap
// import 'styles/theme.scss'
import {
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { Dialog, withWidth } from '@material-ui/core'
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
  container: {
    // NOTE: Only being applied to md and larger devices
    // Position the dialog near the top--the default is to center vertically
    'align-items': 'baseline',
    'margin-top': '2rem'
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
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    width: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']) // <== See https://material-ui.com/layout/breakpoints/#withwidth-options-higher-order-component
  }

  static defaultProps = {
    name: null,
    className: undefined,
    width: 'lg'
  }

  constructor(props) {
    super(props)
    this.state = {
      dropdownOpen: false
    }
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
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }))
  }

  renderSignInButton = () => {
    const { isModalOpen, width, classes } = this.props
    const signInText = 'Sign In'
    const isFullScreen = width === 'xs' || width === 'sm'
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
        fullScreen={isFullScreen}
        classes={!isFullScreen ? classes : undefined}
      >
        <LogIn
          signInText={signInText}
          registerText="Register"
          cancelText="Cancel"
          resetText="Reset"
        />
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
)(withWidth()(withStyles(muiStyles)(LogInModal)))
