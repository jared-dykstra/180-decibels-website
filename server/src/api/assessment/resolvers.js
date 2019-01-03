const dsSelector = context => {
  const { dataSources } = context
  return dataSources.assessmentAPI
}

export default {
  Query: {
    getAssessment: async (parent, args, context) =>
      dsSelector(context).getAssessment(args),

    getResult: async (parent, args, context) =>
      dsSelector(context).getResult(args)
  },
  Mutation: {
    answerQuestion: (parent, args, context, info) =>
      dsSelector(context).answerQuestion(args, context),

    answerQuiz: (parent, args, context, info) =>
      dsSelector(context).answerQuiz(args, context)
  }
}
