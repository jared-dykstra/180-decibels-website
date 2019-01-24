import React, { Suspense } from 'react'

// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
// await sleep(30 * 1000)

const LogInModal = React.lazy(async () =>
  import(/* webpackChunkName: 'LogInModal' */ './LogInModal')
)

const LogInModalLazy = ({ children, ...props }) => (
  // There will be a blank space until the "Sign In" button appears when this component loads
  <Suspense fallback={<div />}>
    <LogInModal {...props}>{children}</LogInModal>
  </Suspense>
)

export default LogInModalLazy
