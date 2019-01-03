// See: https://github.com/apollographql/fullstack-tutorial/blob/master/final/server/src/datasources/user.js
import { DataSource } from 'apollo-datasource'
import {
  getAssessment,
  answerQuestion,
  answerQuiz,
  updateUser
} from '../../db/dbAdapter'

/* eslint-disable class-methods-use-this */

export default class AssessmentApi extends DataSource {
  initialize(config) {
    this.context = config.context
  }

  async getAssessment(args) {
    const { name } = args
    const assessment = await getAssessment(name)
    return assessment
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
    return responseId
  }
}
