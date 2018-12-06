import Immutable from 'seamless-immutable'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'

import {
  isAuthenticatingSelector,
  signInModalIsOpenSelector,
  isSignedInSelector,
  nameSelector
} from 'redux/auth/authSelectors'
import { closeDialog, openDialog, signOut } from 'redux/auth/authActions'
import { LogIn } from 'components'

import styles from './LogInModal.module.scss'

class LogInModal extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    isAuthenticating: PropTypes.bool.isRequired,
    isModalOpen: PropTypes.bool.isRequired,
    doCloseDialog: PropTypes.func.isRequired,
    doOpenDialog: PropTypes.func.isRequired,
    doSignOut: PropTypes.func.isRequired,
    isSignedIn: PropTypes.bool.isRequired,
    name: PropTypes.string
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
    const { isModalOpen } = this.props
    const signInText = 'Sign In'
    return (
      <div>
        <Button color="primary" outline onClick={this.toggleModal}>
          <FontAwesomeIcon icon={faUser} />
          &nbsp;
          {signInText}
        </Button>
        <Modal isOpen={isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>{signInText}</ModalHeader>
          <ModalBody>
            <LogIn signInText={signInText} resetText="Reset" />
          </ModalBody>
        </Modal>
      </div>
    )
  }

  renderUserButton = () => {
    const { name, doSignOut } = this.props
    const { dropdownOpen } = this.state
    return (
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
      <div className={className}>
        {!isAuthenticating &&
          (isSignedIn ? this.renderUserButton() : this.renderSignInButton())}
      </div>
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
)(LogInModal)
