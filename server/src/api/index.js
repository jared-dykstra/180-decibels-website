import { mergeSchemas } from 'graphql-tools'
import { ApolloServer } from 'apollo-server-express'

import assessmentSchema from './assessment/schema'
import AssessmentAPI from './assessment/dataSource'

import userSchema from './user/schema'
import UserAPI from './user/dataSource'

export const createApi = (app, path) => {
  // // See: https://github.com/apollographql/fullstack-tutorial/blob/master/final/server/src/index.js
  const dataSources = () => ({
    assessmentAPI: new AssessmentAPI({ store: 'intentionally undefined' }),
    userAPI: new UserAPI()
  })

  const schema = mergeSchemas({
    schemas: [assessmentSchema, userSchema]
  })

  const apolloServer = new ApolloServer({ schema, dataSources })
  apolloServer.applyMiddleware({ app, path })
}
