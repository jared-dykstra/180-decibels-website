import React, { Suspense } from 'react'

import { Template } from 'components'

const Vast = React.lazy(async () =>
  import(/* webpackChunkName: 'Vast' */ './Vast')
)

const VastLazy = ({
  children,
  location,
  title = '180 Decibels - Vast',
  ...props
}) => (
  // Fallback isn't going to be visible.  If the user clicks the button to open the modal, redux state updates and the modal will open as soon as it loads
  <Suspense
    fallback={
      <Template
        {...{
          title,
          location
        }}
      >
        Loading...
      </Template>
    }
  >
    <Vast location={location} title={title} {...props}>
      {children}
    </Vast>
  </Suspense>
)

export default VastLazy
