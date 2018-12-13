import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'

import { getStartedModalIsOpenSelector } from 'redux/getStarted/getStartedSelectors'
import { closeDialog, openDialog } from 'redux/getStarted/getStartedActions'

class GetStarted extends PureComponent {
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

  // TODO: Create action to toggle
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
    return (
      <Button color="primary" onClick={this.toggleModal} {...rest}>
        {children}
      </Button>
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
