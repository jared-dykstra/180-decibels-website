import React from 'react'
import { Template } from '../../components'

// Used when asynchronously loading a page.
export default () => (
  <Template>
    {/* Just show the empty page.
        In the future, this could render a spinner if this page remains up longer than Xms */}
    <div />
  </Template>
)
