import Immutable from 'seamless-immutable'

export default Immutable.from({
  endpoint: 'https://api.eosnewyork.io',
  desiredNumberOfBlocks: 10,
  updating: false,
  blocks: [],
  error: null
})
