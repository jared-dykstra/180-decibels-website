import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'

import { getStartedModalIsOpenSelector } from 'redux/getStarted/getStartedSelectors'
import { closeDialog, openDialog } from 'redux/getStarted/getStartedActions'

class GetStarted extends PureComponent {
  static propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    doCloseDialog: PropTypes.func.isRequired,
    doOpenDialog: PropTypes.func.isRequired
  }

  toggleModal = () => {
    const { isModalOpen, doCloseDialog, doOpenDialog } = this.props
    if (isModalOpen) {
      doCloseDialog()
    } else {
      doOpenDialog()
    }
  }

  render = () => {
    const { isModalOpen } = this.props
    return (
      <Modal
        fade={false}
        isOpen={isModalOpen}
        toggle={this.toggleModal}
        className="modal-lg"
      >
        <ModalHeader toggle={this.toggleModal}>Get Started</ModalHeader>
        <ModalBody>TODO</ModalBody>
      </Modal>
    )
  }
}

export default connect(
  state => ({
    isModalOpen: getStartedModalIsOpenSelector(state)
  }),
  dispatch => ({
    doCloseDialog: () => dispatch(closeDialog()),
    doOpenDialog: () => dispatch(openDialog())
  })
)(GetStarted)
