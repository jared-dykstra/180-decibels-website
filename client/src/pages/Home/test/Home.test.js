import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import { Home } from '../Home'

// NOTE: This is testing the non-connected version of the component--test coverage of the redux store and selectors
// should be separate from the UI
// NOTE: Shallow render, because child components will also use redux-connect
it('renders without crashing', () => {
  const renderer = new ShallowRenderer()
  const identityFn = () => {}
  const history = {
    replace: identityFn
  }
  const location = {
    hash: '',
    search: '',
    pathname: '/'
  }
  renderer.render(
    <Home
      {...{
        doClickHelpMe: identityFn,
        doClickHelpMyTeam: identityFn,
        history,
        location,
        tracker: {
          event: identityFn
        }
      }}
    />
  )
  // eslint-disable-next-line no-unused-vars
  const result = renderer.getRenderOutput()
  // expect(result.type).toBe('div')
})
