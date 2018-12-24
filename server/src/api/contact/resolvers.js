const dsSelector = context => {
  const { dataSources } = context
  return dataSources.contactAPI
}

export default {
  Query: {},
  Mutation: {
    contactMe: (parent, args, context, info) =>
      dsSelector(context).requestCallback(args, context)
  }
}
