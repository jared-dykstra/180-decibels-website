import Immutable from 'seamless-immutable'
import React, { PureComponent } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'

import { LogIn } from 'components'

class LogInModal extends PureComponent {
  constructor(props) {
    super(props)
    this.state = Immutable.from({
      isModalOpen: false
    })
  }

  toggleModal = () =>
    this.setState(prevState =>
      Immutable.from({
        isModalOpen: !prevState.isModalOpen
      })
    )

  render = () => {
    const { isModalOpen } = this.state
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
