import React from 'react'
import { DynamicModuleLoader } from 'redux-dynamic-modules'

import { module } from 'reduxStore/selfAssessment'
import SelfAssessment from './SelfAssessment'

const SelfAssessmentDynamic = props => (
  <DynamicModuleLoader modules={[module()]}>
    <SelfAssessment {...props} />
  </DynamicModuleLoader>
)

export default SelfAssessmentDynamic
