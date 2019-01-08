import React, { Suspense } from 'react'

const GetStartedModal = React.lazy(async () => import('./GetStartedModal'))

const GetStartedModalLazy = ({ children, ...props }) => (
  // Fallback isn't going to be visible.  If the user clicks the button to open the modal, redux state updates and the modal will open as soon as it loads
  <Suspense fallback={<div>Loading...</div>}>
    <GetStartedModal {...props}>{children}</GetStartedModal>
  </Suspense>
)

export default GetStartedModalLazy
