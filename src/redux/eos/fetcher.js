import { fetch } from 'isomorphic-fetch'
import { JsonRpc } from 'eosjs'

// Useful for simulating latency
// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Fetches the n most recent blocks, and returns an array of blocks.  Index 0 contains the most recent block
 * @param {*} param0
 * @param string param0.endpoint Endpoint URL
 * @param int param0.endpoint How many blocks
 */
export const getBlocks = async ({ endpoint, count = 1 }) => {
  const rpc = new JsonRpc(endpoint, { fetch })
  // const info = await mock.getInfo()
  const info = await rpc.get_info()
  const blocks = []
  let nextBlockId = info.head_block_id
  for (let i = 0; i < count; i += 1) {
    // eslint will warn about await in loop, but there's no way to parallelize this, since the block id isn't known without walking
    // eslint-disable-next-line
    const block = await rpc.get_block(nextBlockId)
    blocks[i] = block
    nextBlockId = block.previous
  }

  return blocks
}

export const getRicardianContract = async () => {
  throw new Error('Not Implemented')
}
