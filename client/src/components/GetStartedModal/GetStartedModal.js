import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'

import { getStartedModalIsOpenSelector } from 'reduxStore/getStarted/getStartedSelectors'
import { toggleDialog } from 'reduxStore/getStarted/getStartedActions'

import GetStarted from './GetStarted'

const GetStartedModal = ({ isModalOpen, doToggleDialog }) => (
  <Modal
    fade={false}
    isOpen={isModalOpen}
    toggle={doToggleDialog}
    className="modal-lg"
  >
    <ModalHeader toggle={doToggleDialog}>Get Started</ModalHeader>
    <ModalBody>
      <GetStarted />
    </ModalBody>
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
