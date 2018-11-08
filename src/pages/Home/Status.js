import React from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { Alert } from 'reactstrap'

import { blockListPropType } from '../../components/BlockList/blockListPropTypes'
import * as eosSelector from '../../redux/eos/eosSelectors'

const Status = ({
  blocks,
  errorText,
  hasError,
  isUpdating,
  latestTimestamp
}) => {
  if (hasError) {
    return <Alert color="danger">{errorText}</Alert>
  }

  if (isUpdating) {
    return <Alert color="success">Loading Blocks...</Alert>
  }

  return (
    <Alert color="light">
      {blocks.length} most recent blocks as of {latestTimestamp}
    </Alert>
  )
}

Status.propTypes = {
  latestTimestamp: propTypes.string,
  isUpdating: propTypes.bool.isRequired,
  blocks: blockListPropType.isRequired,
  hasError: propTypes.bool.isRequired,
  errorText: propTypes.string.isRequired
}

Status.defaultProps = {
  latestTimestamp: 'N/A'
}

export default connect((state /* , ownProps */) => ({
  blocks: eosSelector.blocks(state),
  latestTimestamp: eosSelector.latestBlockTimestamp(state),
  isUpdating: eosSelector.isUpdating(state),
  hasError: eosSelector.hasError(state),
  errorText: eosSelector.errorText(state)
}))(Status)
