import { mergeSchemas } from 'graphql-tools'

import assessmentSchema from './assessment/schema'
import AssessmentAPI from './assessment/dataSource'

import userSchema from './user/schema'
import UserAPI from './user/dataSource'

// // See: https://github.com/apollographql/fullstack-tutorial/blob/master/final/server/src/index.js
export const dataSources = () => ({
  assessmentAPI: new AssessmentAPI({ store: 'intentionally undefined' }),
  userAPI: new UserAPI()
})

export const schema = mergeSchemas({
  schemas: [assessmentSchema, userSchema]
})
