import { filter } from 'lodash'
// import FormData from 'form-data'
import config from 'config'
// TODO: This method is deprecated
import { isNullOrUndefined } from 'util'
import fetch from 'node-fetch'

const checkStatus = res => {
  if (res.ok) {
    return res
  }
  console.error(`HTTP Error: ${res.statusText}`)
  throw new Error(`${res.status} - ${res.statusText}`)
}

const buildHeaders = ({ contentType } = { contentType: 'json' }) => {
  const { restApiUser, restApiKey } = config.get('agileCrm')

  return {
    Accept: 'application/json',
    'Content-Type':
      contentType === 'json'
        ? 'application/json'
        : 'application/x-www-form-urlencoded',
    Authorization: `Basic ${Buffer.from(
      `${restApiUser}:${restApiKey}`
    ).toString('base64')}`
  }
}

/**
 * See: https://github.com/agilecrm/rest-api#1101-search-contact-by-email
 */
export const getContact = async ({ email }) => {
  const { restEndpoint } = config.get('agileCrm')
  const url = `${restEndpoint}api/contacts/search/email/${encodeURIComponent(
    email
  )}`
  const res = await fetch(url, {
    method: 'GET',
    headers: buildHeaders()
  })

  if (res.status === 204) {
    // No contact found for that email address
    return null
  }

  // Check for any other HTTP error
  checkStatus(res)

  // Process the response
  const agileCrmContact = await res.json()
  return agileCrmContact
}

export const createContact = async ({
  tags,
  firstName,
  lastName,
  title,
  company,
  email,
  phone,
  decibelsUid
}) => {
  const properties = [
    {
      type: 'SYSTEM',
      name: 'first_name',
      value: firstName
    },
    {
      type: 'SYSTEM',
      name: 'last_name',
      value: lastName
    },
    {
      type: 'SYSTEM',
      name: 'title',
      value: title
    },
    {
      type: 'SYSTEM',
      name: 'company',
      value: company
    },
    {
      type: 'SYSTEM',
      name: 'email',
      subtype: 'work',
      value: email
    },
    {
      type: 'SYSTEM',
      name: 'phone',
      value: phone,
      subtype: 'work'
    },
    {
      type: 'CUSTOM',
      name: '180Decibels User ID',
      value: decibelsUid
    }
  ]

  const contact = {
    tags,
    properties: filter(properties, p => !isNullOrUndefined(p.value))
  }

  const { restEndpoint } = config.get('agileCrm')
  const url = `${restEndpoint}api/contacts`
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(contact),
    headers: buildHeaders()
  })

  // Check for a duplicate contact
  if (res.status === 400) {
    // An improperly formed request can also cause this
    throw new Error(
      'A contact with that email address already exists in AgileCRM'
    )
  }

  // Check for any other HTTP error
  checkStatus(res)

  // Process the response
  const agileCrmContact = await res.json()
  return agileCrmContact
}

/**
 * See: https://github.com/agilecrm/rest-api#55-create-a-task-based-on-contact-email
 */
export const createTaskForContact = async ({
  email,
  subject,
  dateDue,
  description
}) => {
  const { restEndpoint } = config.get('agileCrm')
  const url = `${restEndpoint}api/tasks/email/${encodeURIComponent(email)}`
  const task = {
    subject,
    type: 'FOLLOW_UP',
    due: dateDue,
    priority_type: 'HIGH',
    status: 'YET_TO_START',
    taskDescription: description
  }
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(task),
    headers: buildHeaders()
  })

  // Check for any other HTTP error
  checkStatus(res)

  // Process the response
  const agileCrmTask = await res.json()
  return agileCrmTask
}

// See: https://github.com/agilecrm/rest-api#42-add-note-to-a-contact-using-email-id
export const createNoteForContact = async ({ email, subject, description }) => {
  const { restEndpoint } = config.get('agileCrm')
  const url = `${restEndpoint}api/contacts/email/note/add`
  // TODO: Using formData a la node-fetch instructions causes agileCRM to return 204, but not do anything
  // See: https://www.npmjs.com/package/node-fetch#post-with-form-data-detect-multipart
  // const form = new FormData()
  // form.append('email', email)
  // form.append('note', JSON.stringify({ subject, description }))

  const qs = new URLSearchParams({
    email,
    note: JSON.stringify({ subject, description })
  }).toString()

  // console.log(`qs=${qs}`)

  const res = await fetch(url, {
    method: 'POST',
    // body: form,
    // body: `email=${email}&note=${JSON.stringify({ subject, description })}`,
    body: qs,
    headers: buildHeaders({ contentType: 'form' })
  })

  // Check for any other HTTP error
  checkStatus(res)

  // 204 indicates success
  // console.log(`createNoteForContact.  res.status=${res.status}`)
}
