const dsSelector = context => {
  const { dataSources } = context
  return dataSources.userAPI
}

export default {
  Query: {
    isEmailInUse: (parent, args, context, info) =>
      dsSelector(context).isEmailInUse(args),
    authenticate: (parent, args, context, info) =>
      dsSelector(context).getUser(parent, args, context, info)
  },
  Mutation: {
    registerUser: (parent, args, context, info) =>
      dsSelector(context).registerUser(args)
  }
}
