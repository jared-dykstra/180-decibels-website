const dsSelector = dataSources => dataSources.userAPI

export default {
  Query: {
    getUser: async (_, { id }, { dataSources }) => {
      const user = dsSelector(dataSources).getUser(id)
      return user
    }
  },
  Mutation: {
    registerUser: async (_, { name }, { dataSources }) => {
      const result = dsSelector(dataSources).registerUser(name)
      return result
    }
  }
}
