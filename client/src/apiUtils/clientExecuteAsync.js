import { get as _get, has as _has } from 'lodash'
import { ApolloLink, execute, makePromise } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'

import { get as configGet } from '../config'

const uri = configGet('apiEndpoint')

// GraphQL Client - See: https://www.apollographql.com/docs/link/index.html#standalone
// See this for an example of authenticating via a token in localstore:  https://github.com/apollographql/apollo-link/tree/master/packages/apollo-link-http#middleware
const httpLink = new HttpLink({
  uri,
  credentials: 'same-origin'
})
const link = ApolloLink.from([httpLink])

const clientExecuteAsync = async (operation, mutationName) => {
  const retval = await makePromise(execute(link, operation))
  if (mutationName) {
    const path = `data.${mutationName}`
    if (_has(retval, path)) {
      return _get(retval, path)
    }
  }
  return retval
}

export default clientExecuteAsync
