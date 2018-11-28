import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'

import { LogIn } from 'components'

class LogInModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isModalOpen: false,
      registerMode: false
    }
  }

  toggleModal = () => {
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen
    }))
  }

  setRegisterMode = registerMode => {
    this.setState(() => ({
      registerMode
    }))
  }

  render() {
    const { isModalOpen, registerMode } = this.state
    const signIn = 'Sign In'
    return (
      <div className="nav-link">
        <Button color="primary" onClick={this.toggleModal}>
          {signIn}
        </Button>
        <Modal isOpen={isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>{signIn}</ModalHeader>
          <ModalBody>
            <LogIn />
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default LogInModal
