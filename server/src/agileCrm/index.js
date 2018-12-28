import { addDays } from 'date-fns'
import { getContact, createContact, createTaskForContact } from './agileCrm'

const TAG_GET_STARTED = 'Website GetStarted'
// const TAG_REGISTER = 'Website Register'

const getOrCreateContact = async ({
  email,
  firstName,
  lastName,
  title,
  company,
  phone,
  decibelsUid
}) => {
  const existingContact = await getContact({ email })
  if (existingContact) {
    return existingContact
  }

  // Doesn't exist yet, so create it
  const newContact = await createContact({
    tags: [TAG_GET_STARTED],
    email,
    firstName,
    lastName,
    title,
    company,
    phone,
    decibelsUid
  })

  return newContact
}

export const handleGetStarted = async ({
  email,
  firstName,
  lastName,
  title,
  company,
  phone,
  decibelsUid,
  description
}) => {
  const contact = await getOrCreateContact({
    email,
    firstName,
    lastName,
    title,
    company,
    phone,
    decibelsUid
  })

  console.log(`AgileCRM Contact=${JSON.stringify(contact, null, 2)}`)

  // Add a task - The contact (via specified email) must already exist
  const task = await createTaskForContact({
    email,
    subject: 'Get Started Follow-up',
    dateDue: Math.round(addDays(new Date(), 1).getTime() / 1000),
    description
  })

  console.log(`AgileCRM Task=${JSON.stringify(task, null, 2)}`)

  return { task, contact }
}
