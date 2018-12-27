import { filter, isNull } from 'lodash'
import config from 'config'
import { isNullOrUndefined } from 'util'
import fetch from 'node-fetch'

const { restApiKey, restEndpoint } = config.get('agileCrm')

const checkStatus = res => {
  if (res.ok) {
    return res
  }
  throw new Error(res.statusText)
}

export const createContact = async ({
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
    tag: ['Lead'],
    properties: filter(properties, p => !isNullOrUndefined(p.value))
  }

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }

  console.log(`HERE: ${JSON.stringify({ contact, headers })}`)

  const res = await fetch(restEndpoint, {
    method: 'post',
    body: JSON.stringify(contact),
    headers
  })
  checkStatus(res)
  const json = await res.json()
  console.log(`RESPONSE: ${json}`)
}
