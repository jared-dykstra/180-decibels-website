import React, { Suspense } from 'react'

const GetStartedModalDynamic = React.lazy(async () =>
  import(/* webpackChunkName: 'GetStartedModal' */ './GetStartedModalDynamic')
)

const GetStartedModalLazy = ({ children, ...props }) => (
  // Fallback isn't going to be visible.  If the user clicks the button to open the modal, redux state updates and the modal will open as soon as it loads
  <Suspense fallback={null}>
    <GetStartedModalDynamic {...props}>{children}</GetStartedModalDynamic>
  </Suspense>
)

export default GetStartedModalLazy
