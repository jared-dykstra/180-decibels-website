// See: https://github.com/apollographql/fullstack-tutorial/blob/master/final/server/src/datasources/user.js
import { DataSource } from 'apollo-datasource'

import assessmentConfig from './assessmentConfiguration.json'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export default class AssessmentApi extends DataSource {
  constructor({ store }) {
    super()
    this.store = store
    this.delay = 1000
  }

  initialize(config) {
    this.context = config.context
  }

  async getAssessment(name) {
    await sleep(this.delay)
    const config = assessmentConfig[name]
    const questions = Object.entries(config.questions).map(([k, v]) => ({
      id: k,
      ...v
    }))
    const retval = {
      name,
      version: config.version,
      configuration: config.configuration,
      questions
    }
    return retval
  }

  async createAssessmentResultSet() {
    await sleep(this.delay)
    return ['message 1', 'message 2']
  }
}
