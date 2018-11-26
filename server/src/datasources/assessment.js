// See: https://github.com/apollographql/fullstack-tutorial/blob/master/final/server/src/datasources/user.js
import { DataSource } from 'apollo-datasource'

import assessmentConfig from './assessmentConfiguration.json'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

class AssessmentAPI extends DataSource {
  constructor({ store }) {
    console.log('Datasource Constructor')
    super()
    this.store = store
    this.delay = 1000
  }

  initialize(config) {
    this.context = config.context
    console.log(`initialize method.  delay=${this.delay}`)
  }

  async getAssessment(name) {
    await sleep(this.delay)
    const config = assessmentConfig[name]
    const questions = Object.entries(config.questions).map(([k, v]) => ({
      id: k,
      ...v
    }))
    const retval = { name, questions }
    return retval
  }

  async createAssessmentResultset() {
    await sleep(this.delay)
    return ['message 1', 'message 2']
  }
}

export default AssessmentAPI
