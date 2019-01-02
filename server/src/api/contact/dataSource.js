// See: https://github.com/apollographql/fullstack-tutorial/blob/master/final/server/src/datasources/user.js
import { DataSource } from 'apollo-datasource'

import { handleGetStarted } from '../../agileCrm'

/* eslint-disable class-methods-use-this */

export default class ContactApi extends DataSource {
  async requestCallback(args, context) {
    const { /* user, */ userId } = context
    const { contactInfo } = args
    // console.log(
    //   `requestCallback context=${JSON.stringify({
    //     userId,
    //     user, // <== only available if signed in, which is unlikely
    //     contactInfo
    //   })}`
    // )

    /* const { task, contact } = */ await handleGetStarted({
      email: contactInfo.email,
      firstName: contactInfo.firstName,
      lastName: contactInfo.lastName,
      title: contactInfo.title,
      company: contactInfo.company,
      phone: contactInfo.phone,
      decibelsUid: userId,
      description: `This person requested to be contacted at/on: ${
        contactInfo.dateTime
      }`
    })

    return null
  }
}
