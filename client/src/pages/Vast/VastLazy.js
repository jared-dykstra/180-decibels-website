import React, { Suspense } from 'react'

const Vast = React.lazy(async () => import('./Vast'))

const VastLazy = ({ children, ...props }) => (
  // Fallback isn't going to be visible.  If the user clicks the button to open the modal, redux state updates and the modal will open as soon as it loads
  <Suspense fallback={<div>Loading...</div>}>
    <Vast {...props}>{children}</Vast>
  </Suspense>
)

export default VastLazy
