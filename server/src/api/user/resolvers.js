const dsSelector = context => {
  const { dataSources } = context
  return dataSources.userAPI
}

export default {
  Query: {
    getUser: async (parent, args, context, info) => {
      const user = dsSelector(context).getUser(args)
      return user
    }
  },
  Mutation: {
    registerUser: async (parent, args, context, info) => {
      const result = dsSelector(context).registerUser(args)
      return result
    }
  }
}
