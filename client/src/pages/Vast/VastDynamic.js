import React from 'react'
import { DynamicModuleLoader } from 'redux-dynamic-modules'

import { module } from 'reduxStore/vast'
import Vast from './Vast'

const VastDynamic = props => (
  <DynamicModuleLoader modules={[module()]}>
    <Vast {...props} />
  </DynamicModuleLoader>
)

export default VastDynamic
