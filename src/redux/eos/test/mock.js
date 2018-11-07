export const getInfoSync = () => ({
  server_version: 'd9ad8eec',
  head_block_num: 8592,
  last_irreversible_block_num: 8591,
  head_block_id:
    '00002190e805475db152be7d3f4f1a075efaed42827cd551b0e23c7feabbedac',
  head_block_time: '2018-04-27T17:40:34',
  head_block_producer: 'eosio'
})

export const getBlockSync = id => ({
  previous: '00000004471d48fe40706e73ce27f9cf7bac1704ae55279c7a58c0173718a711',
  timestamp: '2018-04-18T16:24:23.500',
  transaction_mroot:
    'e366c0cc3519bb0f2ddaec20928fa4d6aae546194bb1c4205c67be429147ed4a',
  action_mroot:
    '77e5e91b594ab4ebc44ebc8c7ecdc9d26409c5a07452d3b20a4840562fdeb658',
  block_mroot:
    '4ef85b0d212f3fffabdd65680d32dd7dded3461d9df226a6e3dc232e42978f8b',
  producer: 'eosio',
  schedule_version: 0,
  new_producers: null,
  producer_signature:
    'EOSJzEdFDsueKCerL7a6AdxMxiT851cEiugFB7ux1PAGn5eMmco8j32NsaKupxibheQGVFEqyEdjMub67VZjKmsLzuNxxKtUA',
  regions: [
    {
      region: 0,
      cycles_summary: [
        [
          {
            read_locks: [],
            write_locks: [],
            transactions: [
              {
                status: 'executed',
                kcpu_usage: 2,
                net_usage_words: 38,
                id:
                  '9880c128683e24845ccd282ebe026bd522f7fa9c6278d885f6ed35164c680669'
              }
            ]
          }
        ]
      ]
    }
  ],
  input_transactions: [],
  id,
  block_num: 5,
  ref_block_prefix: 2528857883
})

// Redux module test fixture
export const fixture = {
  eos: {
    updating: false,
    error: null,
    blocks: [getBlockSync(getInfoSync().head_block_id)]
  }
}
