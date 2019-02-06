import React from 'react'
import { DynamicModuleLoader } from 'redux-dynamic-modules'

import { module } from 'reduxStore/selfAssessment'
import AssessmentResult from './AssessmentResult'

const AssessmentResultDynamic = props => (
  <DynamicModuleLoader modules={[module()]}>
    <AssessmentResult {...props} />
  </DynamicModuleLoader>
)

export default AssessmentResultDynamic
