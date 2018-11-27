const dsSelector = context => {
  const { dataSources } = context
  return dataSources.userAPI
}

export default {
  Query: {
    isEmailInUse: async (parent, args, context, info) =>
      dsSelector(context).isEmailInUse(args),

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
