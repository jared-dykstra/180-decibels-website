import React from 'react'
import { DynamicModuleLoader } from 'redux-dynamic-modules'

import { module } from 'reduxStore/getStarted'
import GetStartedModal from './GetStartedModal'

const GetStartedModalDynamic = props => (
  <DynamicModuleLoader modules={[module()]}>
    <GetStartedModal {...props} />
  </DynamicModuleLoader>
)

export default GetStartedModalDynamic
