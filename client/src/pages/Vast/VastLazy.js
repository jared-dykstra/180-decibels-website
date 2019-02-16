import React, { Suspense } from 'react'

import { Template } from 'components'

const VastDynamic = React.lazy(async () =>
  import(/* webpackChunkName: 'Vast' */ './VastDynamic')
)

const VastLazy = ({
  children,
  location,
  title = '180 Decibels - Graph Intelligence',
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
    <VastDynamic location={location} title={title} {...props}>
      {children}
    </VastDynamic>
  </Suspense>
)

export default VastLazy
