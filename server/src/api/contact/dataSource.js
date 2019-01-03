// See: https://github.com/apollographql/fullstack-tutorial/blob/master/final/server/src/datasources/user.js
import { DataSource } from 'apollo-datasource'

import { handleGetStarted } from '../../agileCrm'
import { updateUser } from '../../db/dbAdapter'

/* eslint-disable class-methods-use-this */

export default class ContactApi extends DataSource {
  async requestCallback(args, context) {
    // const { /* user, */ userId } = context
    const userId = '993731af-df98-4c4b-a980-69bd7a42967c'
    const { contactInfo } = args

    await updateUser(userId, contactInfo)

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
