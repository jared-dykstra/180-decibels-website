// See: https://github.com/apollographql/fullstack-tutorial/blob/master/final/server/src/datasources/user.js
import { DataSource } from 'apollo-datasource'
import {
  getAssessment,
  getAssessmentResult,
  answerQuestion,
  answerQuiz,
  updateUser,
  getCompetencies
} from '../../db/dbAdapter'

import gradeQuiz from './GradeQuiz'

/* eslint-disable class-methods-use-this */

const getGradedAssessmentResult = async resultId => {
  const { quizRubric, ...response } = await getAssessmentResult(resultId)
  const competencies = await getCompetencies()
  const grade = gradeQuiz({ competencies, quizRubric, response })
  const gradedResponse = { ...response, grade }
  return gradedResponse
}

export default class AssessmentApi extends DataSource {
  initialize(config) {
    this.context = config.context
  }

  async getAssessment(args) {
    const { name } = args
    const assessment = await getAssessment(name)
    return assessment
  }

  async getAssessmentResult(args) {
    const { id: resultId } = args
    const gradedResponse = await getGradedAssessmentResult(resultId)

    const { quizTimestamp, originalUserId, contactInfo, grade } = gradedResponse
    const grades = Object.entries(grade).map(([competencyId, value]) => ({
      competencyId,
      ...value
    }))
    const response = {
      quizTimestamp: `${quizTimestamp}`,
      originalUserId,
      contactInfo,
      grades
    }

    console.log(`response: ${JSON.stringify(response, null, 2)}`)

    return response
  }

  async answerQuestion(args, context) {
    const { answer } = args
    const { userId } = context
    const answerId = await answerQuestion(userId, answer)
    return answerId
  }

  async answerQuiz(args, context) {
    const { response } = args
    const { userId } = context
    await updateUser(userId, response.contactInfo)
    const responseId = await answerQuiz(userId, response)

    // TODO: Start background task (non-awaited promise) to build graded response and add to AgileCRM
    // const gradedResponse = getGradedAssessmentResult(responseId)

    return responseId
  }
}
