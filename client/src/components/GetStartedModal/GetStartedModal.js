import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'

import { getStartedModalIsOpenSelector } from 'redux/getStarted/getStartedSelectors'
import { toggleDialog } from 'redux/getStarted/getStartedActions'

const GetStartedModal = ({ isModalOpen, doToggleDialog }) => (
  <Modal
    fade={false}
    isOpen={isModalOpen}
    toggle={doToggleDialog}
    className="modal-lg"
  >
    <ModalHeader toggle={doToggleDialog}>Get Started</ModalHeader>
    <ModalBody>TODO</ModalBody>
  </Modal>
)

GetStartedModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  doToggleDialog: PropTypes.func.isRequired
}

export default connect(
  state => ({
    isModalOpen: getStartedModalIsOpenSelector(state)
  }),
  dispatch => ({
    doToggleDialog: () => dispatch(toggleDialog())
  })
)(GetStartedModal)
