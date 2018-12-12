import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'

import { getStartedModalIsOpenSelector } from 'redux/getStarted/getStartedSelectors'
import { closeDialog, openDialog } from 'redux/getStarted/getStartedActions'

class GetStartedModal extends PureComponent {
  static propTypes = {
    children: PropTypes.string.isRequired,
    className: PropTypes.string,
    size: PropTypes.string,
    isModalOpen: PropTypes.bool.isRequired,
    doCloseDialog: PropTypes.func.isRequired,
    doOpenDialog: PropTypes.func.isRequired
  }

  static defaultProps = {
    className: undefined,
    size: undefined
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
    const { isModalOpen, children, ...rest } = this.props
    return [
      <Button key="button" color="primary" onClick={this.toggleModal} {...rest}>
        {children}
      </Button>,
      <Modal
        key="modal"
        isOpen={isModalOpen}
        toggle={this.toggleModal}
        className="modal-lg"
      >
        <ModalHeader toggle={this.toggleModal}>{children}</ModalHeader>
        <ModalBody>TODO</ModalBody>
      </Modal>
    ]
  }
}

export default connect(
  (state /* , ownProps */) => ({
    isModalOpen: getStartedModalIsOpenSelector(state)
  }),
  dispatch => ({
    doCloseDialog: () => dispatch(closeDialog()),
    doOpenDialog: () => dispatch(openDialog())
  })
)(GetStartedModal)
