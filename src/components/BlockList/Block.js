import React from 'react'
import { blockPropType } from './blockListPropTypes'

const BlockList = props => {
  const { block } = props

  // Choose a subset of fields, which get rendered as an unordered KV-pair list
  const fields = {
    hash: block.id,
    timestamp: block.timestamp,
    actionCount: block.transactions.length
  }

  return (
    <ul>
      {Object.entries(fields).map(([k, v]) => (
        <li key={k}>{`${k}: ${v}`}</li>
      ))}
    </ul>
  )
}

BlockList.propTypes = {
  block: blockPropType.isRequired
}

export default BlockList
