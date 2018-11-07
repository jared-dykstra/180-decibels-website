import React from 'react'
import { blockListPropType } from './blockListPropTypes'

import Block from './Block'

const BlockList = props => (
  <ol>
    {props.blocks.map(block => (
      <li key={block.id}>
        <Block block={block} />
      </li>
    ))}
  </ol>
)

BlockList.propTypes = {
  blocks: blockListPropType.isRequired
}

export default BlockList
