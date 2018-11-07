import { getBlocks } from '../fetcher'
import { getInfoSync, getBlockSync } from './mock'

// There's not a lot of value in this test...But that's because this fetcher is so simple
describe('fetcher', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  it('calls the EOS API correctly', async () => {
    fetch
      .once(JSON.stringify(getInfoSync()))
      .once(
        JSON.stringify(
          getBlockSync(
            '00002190e805475db152be7d3f4f1a075efaed42827cd551b0e23c7feabbedac'
          )
        )
      )
      .once(
        JSON.stringify(
          getBlockSync(
            '00000004471d48fe40706e73ce27f9cf7bac1704ae55279c7a58c0173718a711'
          )
        )
      )

    const config = {
      count: 2,
      endpoint: 'https://my.fake.endpoint'
    }
    const blocks = await getBlocks(config)

    expect(fetch.mock.calls.length).toEqual(config.count + 1)
    expect(blocks.length).toEqual(config.count)
    expect(blocks[0].id).toEqual(
      '00002190e805475db152be7d3f4f1a075efaed42827cd551b0e23c7feabbedac'
    )
    expect(blocks[1].id).toEqual(
      '00000004471d48fe40706e73ce27f9cf7bac1704ae55279c7a58c0173718a711'
    )
    expect(blocks[0].previous).toEqual(blocks[1].id)
  })
})
