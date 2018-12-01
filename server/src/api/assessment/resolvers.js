const dsSelector = dataSources => dataSources.assessmentAPI

export default {
  Query: {
    getAssessment: async (_, { name }, { dataSources }) => {
      const assessment = dsSelector(dataSources).getAssessment(name)
      return assessment
    }
  },
  Mutation: {
    createAssessmentResultSet: async (_, { results }, { dataSources }) => {
      const result = dsSelector(dataSources).createAssessmentResultSet(results)
      return result
    }
  }
}
