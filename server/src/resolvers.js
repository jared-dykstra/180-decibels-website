export default {
  Query: {
    assessment: async (_, { name }, { dataSources }) => {
      console.log(`HERE1: name=${name}`)
      const assessment = dataSources.assessmentAPI.getAssessment(name)
      return assessment
    }
  },
  Mutation: {
    createAssessment: async (_, { results }, { dataSources }) => {
      const result = dataSources.assessmentAPI.createAssessment(results)
      return result
    }
  }
}
