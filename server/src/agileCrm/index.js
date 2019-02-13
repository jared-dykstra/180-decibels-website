import { addDays } from 'date-fns'
import {
  getContact,
  createContact,
  createTaskForContact,
  createNoteForContact
} from './agileCrm'

const TAG_WEBSITE_LEAD = 'Website Lead'
const TAG_GET_STARTED = 'Consultation'
const TAG_ASSESSMENT = 'Assessment'
// const TAG_REGISTER = 'Website Register'

const getOrCreateContact = async ({
  email,
  firstName,
  lastName,
  title,
  company,
  phone,
  decibelsUid,
  tags
}) => {
  const existingContact = await getContact({ email })
  if (existingContact) {
    return existingContact
  }

  // Doesn't exist yet, so create it
  const newContact = await createContact({
    tags,
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
    decibelsUid,
    tags: [TAG_WEBSITE_LEAD, TAG_GET_STARTED]
  })

  // console.log(`AgileCRM Contact=${JSON.stringify(contact, null, 2)}`)

  // Add a task - The contact (via specified email) must already exist
  const task = await createTaskForContact({
    email,
    subject: 'Get Started Follow-up',
    dateDue: Math.round(addDays(new Date(), 1).getTime() / 1000),
    description
  })

  // console.log(`AgileCRM Task=${JSON.stringify(task, null, 2)}`)

  return { task, contact }
}

const asText = gradedResponse => {
  const { quizTimestamp, grades, response } = gradedResponse
  const { questions, quizName } = response
  const retval = `
Quiz Date: ${new Date(Number(quizTimestamp)).toString()}
Quiz Name: ${quizName}

Grades:
${grades
  .map(g => {
    const score = `${Math.round(g.score * 100)}%`
    const threshold = `${Math.round(g.threshold * 100)}%`
    return `\t${g.name} - ${score}  (Threshold is set to ${threshold})`
  })
  .join('\n')}

Answers:
${Object.values(questions)
  .map((q, i) => {
    const { normalizedScore, originalScore, total, text } = q
    const normalizedScoreTxt = `Normalized Score ${normalizedScore}/${total}`
    const scoreTxt = `Original Score ${originalScore}/${total}`
    const n = i + 1
    return `\t${n} - ${text}\n\t\t${normalizedScoreTxt}\n\t\t${scoreTxt}\n`
  })
  .join('\n')}
`
  return retval
}

export const handleAssessmentResponder = async ({
  email,
  firstName,
  lastName,
  title,
  company,
  phone,
  decibelsUid,
  gradedResponse
}) => {
  // Add the contact
  const contact = await getOrCreateContact({
    email,
    firstName,
    lastName,
    title,
    company,
    phone,
    decibelsUid,
    tags: [TAG_WEBSITE_LEAD, TAG_ASSESSMENT]
  })

  // Add a task - The contact (via specified email) must already exist
  const task = await createTaskForContact({
    email,
    subject: 'Self-Assessment Follow-up',
    dateDue: Math.round(addDays(new Date(), 1).getTime() / 1000)
  })

  // Add a note for the contact
  await createNoteForContact({
    email,
    subject: 'Self-Assessment Results',
    description: asText(gradedResponse)
  })

  return { task, contact }
}
