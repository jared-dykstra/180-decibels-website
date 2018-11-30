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

import {
  signInModalIsOpenSelector,
  isSignedInSelector,
  nameSelector
} from 'redux/userManagement/userManagementSelectors'
import {
  closeDialog,
  openDialog,
  authenticate,
  signOut
} from 'redux/userManagement/userManagementActions'

import { LogIn } from 'components'

class LogInModal extends PureComponent {
  static propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    doCloseDialog: PropTypes.func.isRequired,
    doOpenDialog: PropTypes.func.isRequired,
    doAuthenticate: PropTypes.func.isRequired,
    doSignOut: PropTypes.func.isRequired,
    isSignedIn: PropTypes.bool.isRequired,
    name: PropTypes.string
  }

  static defaultProps = {
    name: null
  }

  constructor(props) {
    super(props)
    this.state = Immutable.from({
      menuOpen: false
    })
  }

  componentDidMount = () => {
    // Trigger an automatic authentication attempt when the page loads
    const { doAuthenticate } = this.props
    doAuthenticate(null)
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
      <div className="nav-link">
        <Button color="primary" onClick={this.toggleModal}>
          {signInText}
        </Button>
        <Modal isOpen={isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>{signInText}</ModalHeader>
          <ModalBody>
            <LogIn />
          </ModalBody>
        </Modal>
      </div>
    )
  }

  renderUserButton = () => {
    const { name, doSignOut } = this.props
    const { dropdownOpen } = this.state
    return (
      <Dropdown isOpen={dropdownOpen} toggle={this.toggleMenu} inNavbar>
        <DropdownToggle tag="a" className="nav-link" caret>
          {name}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={doSignOut}>Sign Out</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    )
  }

  render = () => {
    const { isSignedIn } = this.props
    return isSignedIn ? this.renderUserButton() : this.renderSignInButton()
  }
}

export default connect(
  (state /* , ownProps */) => ({
    isModalOpen: signInModalIsOpenSelector(state),
    isSignedIn: isSignedInSelector(state),
    name: nameSelector(state)
  }),
  dispatch => ({
    doCloseDialog: () => dispatch(closeDialog()),
    doOpenDialog: () => dispatch(openDialog()),
    doAuthenticate: () => dispatch(authenticate()),
    doSignOut: () => dispatch(signOut())
  })
)(LogInModal)
