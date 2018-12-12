// TODO: react-scripts v2 has babel-macros.  See if it can be used for transform-export-extensions, as per https://github.com/tc39/proposal-export-ns-from
import * as actions from './selfAssessmentActions'
import * as selectors from './selfAssessmentSelectors'

export { default as reducer } from './selfAssessmentReducer'
export { actions }
export { selectors }
export const mountPoint = 'selfAssessment'
