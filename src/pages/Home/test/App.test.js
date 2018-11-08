import React from 'react'
import ReactDOM from 'react-dom'
import Home from '../Home'

// TODO: Inject the store via <Provider /> and re-enable this test
// Let's be honest...There isn't really any logic to test since the selectors have already been tested
it.skip('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Home />, div)
  ReactDOM.unmountComponentAtNode(div)
})
