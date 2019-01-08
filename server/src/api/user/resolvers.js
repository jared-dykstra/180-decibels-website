const dsSelector = context => {
  const { dataSources } = context
  return dataSources.userAPI
}

export default {
  Query: {
    isEmailInUse: (parent, args, context, info) =>
      dsSelector(context).isEmailInUse(args),
    authenticate: (parent, args, context, info) =>
      dsSelector(context).authenticate(context)
  },
  Mutation: {
    registerUser: (parent, args, context, info) =>
      dsSelector(context).registerUser(args, context),
    signIn: (parent, args, context, info) =>
      dsSelector(context).signIn(args, context),
    signOut: (parent, args, context, info) =>
      dsSelector(context).signOut(args, context),
    logPageView: (parent, args, context, info) =>
      dsSelector(context).logPageView(args, context),
    logModalView: (parent, args, context, info) =>
      dsSelector(context).logModalView(args, context),
    logEvent: (parent, args, context, info) =>
      dsSelector(context).logEvent(args, context),
    logError: (parent, args, context, info) =>
      dsSelector(context).logError(args, context)
  }
}
