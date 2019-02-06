import React, { Suspense } from 'react'

import { Template } from 'components'

const AssessmentResultDynamic = React.lazy(async () =>
  import(/* webpackChunkName: 'AssessmentResult' */ './AssessmentResultDynamic')
)

const AssessmentResultLazy = ({
  children,
  location,
  title = '180 Decibels - Assessment Result',
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
    <AssessmentResultDynamic location={location} title={title} {...props}>
      {children}
    </AssessmentResultDynamic>
  </Suspense>
)

export default AssessmentResultLazy
