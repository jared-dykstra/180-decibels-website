// See: https://github.com/apollographql/fullstack-tutorial/blob/master/final/server/src/datasources/user.js
import { DataSource } from 'apollo-datasource'
import config from 'config'

import {
  getAssessment,
  answerQuestion,
  answerQuiz,
  updateUser,
  getGradedAssessmentResult
} from '../../db/dbAdapter'
import { sendAssessmentResultsEmail } from '../../notifications/assessmentResultsEmail'
import { handleAssessmentResponder } from '../../agileCrm'

/* eslint-disable class-methods-use-this */

export default class AssessmentApi extends DataSource {
  async getAssessment(args) {
    const { name } = args
    const assessment = await getAssessment(name)
    return assessment
  }

  async getAssessmentResult(args) {
    const { id: resultId } = args
    const gradedResponse = await getGradedAssessmentResult(resultId)
    return gradedResponse
  }

  async answerQuestion(args, context) {
    const { answer } = args
    const { userId } = context
    const answerId = await answerQuestion(userId, answer)
    return answerId
  }

  async answerQuiz(args, context) {
    const { userId } = context
    const { response } = args
    const { contactInfo } = response
    const { email } = contactInfo

    // Update user's contact information
    await updateUser(userId, contactInfo)

    // Store their answers in our DB
    const resultId = await answerQuiz(userId, response)
    const rootUrl = config.get('rootUrl')

    // Send an email to the user
    const getRoute = () => {
      const ID_HELP_ME = '439a564d-adc9-497b-9dba-a9d8de6caf75'
      const ID_HELP_MY_TEAM = '853020dd-ebc6-458c-8bf2-eb5a1cc6101f'
      switch (response.quizId) {
        // TODO: Lookup the following route constants from the database
        case ID_HELP_ME:
          return 'help-me'
        case ID_HELP_MY_TEAM:
          return 'help-my-team'
        default:
          console.error('Unexpected Quiz ID')
          return ''
      }
    }
    const resultsUrl = `${rootUrl}/${getRoute()}/result/${resultId}`
    await sendAssessmentResultsEmail({ resultsUrl, email })

    // Create the contact in Agile CRM, with the graded assessment
    const gradedResponse = await getGradedAssessmentResult(resultId)
    await handleAssessmentResponder({
      email,
      firstName: contactInfo.firstName,
      lastName: contactInfo.lastName,
      title: undefined,
      company: contactInfo.company,
      phone: undefined,
      decibelsUid: userId,
      gradedResponse
    })

    return resultId
  }
}
