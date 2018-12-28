import { filter } from 'lodash'
import config from 'config'
import { isNullOrUndefined } from 'util'
import fetch from 'node-fetch'

const agileCrmConfig = config.get('agileCrm')

const checkStatus = res => {
  if (res.ok) {
    return res
  }
  console.error(`HTTP Error: ${res.statusText}`)
  throw new Error(`${res.status} - ${res.statusText}`)
}

const buildHeaders = () => {
  const { restApiUser, restApiKey } = agileCrmConfig
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Basic ${Buffer.from(
      `${restApiUser}:${restApiKey}`
    ).toString('base64')}`
  }
}

export const TAG_GET_STARTED = 'Website GetStarted'
export const TAG_REGISTER = 'Website Register'

export const createContact = async ({
  tags,
  firstName,
  lastName,
  title,
  company,
  email,
  phone
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
    }
  ]

  const contact = {
    tags,
    properties: filter(properties, p => !isNullOrUndefined(p.value))
  }

  const { restEndpoint } = agileCrmConfig
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
