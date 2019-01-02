// See: https://github.com/apollographql/fullstack-tutorial/blob/master/final/server/src/datasources/user.js
import { DataSource } from 'apollo-datasource'
import { getAssessment } from '../../db/dbAdapter'

/* eslint-disable class-methods-use-this */

export default class AssessmentApi extends DataSource {
  initialize(config) {
    this.context = config.context
  }

  async getAssessment(name) {
    const assessment = await getAssessment(name)
    return assessment
  }

  async createAssessmentResultSet() {
    return ['message 1', 'message 2']
  }
}
