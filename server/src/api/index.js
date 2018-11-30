import config from 'config'
// import morgan from 'morgan'
import { mergeSchemas } from 'graphql-tools'
import { ApolloServer } from 'apollo-server-express'

import assessmentSchema from './assessment/schema'
import AssessmentAPI from './assessment/dataSource'

import userSchema from './user/schema'
import UserAPI from './user/dataSource'

/**
 * Installs apollo-server to handle requests under `path`
 * @param {*} app Express instance
 * @param {*} path route path, like '/graphql'
 */
export const createApi = (app, path) => {
  // See: https://github.com/apollographql/fullstack-tutorial/blob/master/final/server/src/index.js
  const dataSources = () => ({
    assessmentAPI: new AssessmentAPI({ store: 'intentionally undefined' }),
    userAPI: new UserAPI()
  })

  const schema = mergeSchemas({
    schemas: [assessmentSchema, userSchema]
  })

  // morgan.token('graphql-query', req => {
  //   const { operationName } = req.body
  //   return `GRAPHQL: Operation Name: ${operationName}`
  // })
  // TODO: Add custom logging middleware for GraphQL queries/mutations
  // The next line would add middleware to all of express, but I only want this style of logging for graphQL
  // app.use(morgan(':graphql-query'))

  const apolloServer = new ApolloServer({
    schema,
    dataSources,
    context: ({ req }) => ({
      // Use the user which has already been parsed by express-jwt middleware
      user: req.user,
      token: req.cookies[config.get('jwtCookieName')]
    })
  })
  apolloServer.applyMiddleware({ app, path })
}
