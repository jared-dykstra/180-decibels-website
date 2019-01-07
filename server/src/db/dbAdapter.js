import uuid from 'uuid/v1'
import config from 'config'
import {
  find as _find,
  includes as _includes,
  head as _head,
  merge as _merge,
  omit as _omit
} from 'lodash'
import { hash } from 'bcrypt'
import { UserInputError } from 'apollo-server-express'
import Knex from 'knex'

import logLevels, { NOTICE, CRITICAL } from './logLevels'

const knexConfig = config.get('knex')
const knex = Knex(knexConfig)

const normalizeEmail = email => (email ? email.toLowerCase().trim() : email)

// The JSON data type returns an object if the underlying DB is postgres; string if it's sqllite
// TODO: Find a reusable solution: https://github.com/tgriesser/knex/issues/2575
const fromJsonb = arg => (typeof arg === 'object' ? arg : JSON.parse(arg))

// Unpack the database representation of a user
const fromDbUser = user => {
  const properties = fromJsonb(user.properties)

  return {
    user: {
      id: user.uid,
      aliases: fromJsonb(user.aliases),
      email: user.email,
      ...properties
    },
    hashedPassword: user.hashedPassword
  }
}

export const appendLogEvent = async ({
  userId,
  source,
  event,
  severity = NOTICE
}) => {
  const log = {
    createdAt: new Date(),
    severity: _includes(logLevels, severity) ? severity : CRITICAL,
    uid: userId,
    eventSource: source,
    data: JSON.stringify(event)
  }
  await knex('log').insert(log)
  console.log(`SYSLOG - ${log.eventSource} (${log.severity}) - ${log.data}`)
}

export const findUserByEmail = async email => {
  if (!email) {
    return null
  }
  const normalizedEmail = normalizeEmail(email)
  const user = await knex('users')
    .whereNull('deletedAt')
    .where({ email: normalizedEmail })
    .first()

  // If no match; user is undefined
  return !(user === undefined || user === null) ? fromDbUser(user) : undefined
}

const findUserById = async id => {
  if (!id) {
    return null
  }
  const user = await knex('users')
    .whereNull('deletedAt')
    .where({ uid: id })
    .first()

  // If no match; user is undefined
  return !(user === undefined || user === null) ? fromDbUser(user) : undefined
}

/**
 * This function is invoked when a user used the "contactMe" form or filled out an assessment
 * userIn must contain an email address and may or may not have additional fields
 */
export const updateUser = async (userId, userIn) => {
  if (!userId) {
    throw new Error('updateUser: userId is null or undefined')
  }

  // Does the userID already exist?
  const existingUserById = await findUserById(userId)
  if (!existingUserById) {
    // If not, create it
    await registerDbUser(userId, userIn)
  } else {
    await updateExistingUser({
      newUser: { user: userIn },
      existingUser: existingUserById
    })
  }

  // TODO: It's possible that the email address already exists on a different user
  // Does the email already exist?
  // const { email: rawEmail } = userIn
  // const normalizedEmail = normalizeEmail(rawEmail)

  // if (!normalizedEmail) {
  //   // Nothing to do - The "Contact Me" form doesn't require an email
  // }
  // const existingUserByEmail = await findUserByEmail(normalizedEmail)
}

const updateExistingUser = async ({ newUser, existingUser }) => {
  const updatedUser = _merge(existingUser.user, newUser.user)
  if (newUser.user.id && existingUser.user.id !== newUser.user.id) {
    updatedUser.id = existingUser.id
    if (!_includes(updatedUser.aliases, newUser.user.id)) {
      updatedUser.aliases.push(newUser.user.id)
    }
  }

  const { id, aliases, email, ...rest } = updatedUser
  await knex('users')
    .where({ uid: existingUser.user.id })
    .update({
      uid: id,
      aliases: JSON.stringify(aliases),
      email,
      properties: JSON.stringify(rest)
    })
}

/**
 * This function is invoked when a user is filling out the registration form
 */
export const registerDbUser = async (userId, userIn) => {
  const { email: rawEmail } = userIn
  const normalizedEmail = normalizeEmail(rawEmail)

  // Ensure the email isn't already in use
  const existingUserByEmail = await findUserByEmail(normalizedEmail)
  if (existingUserByEmail) {
    throw new UserInputError(
      `The email address ${normalizedEmail} is already in use`,
      { invalidArgs: ['email'] }
    )
  }

  // Exclude the password and replaced with hashed/salted value
  // Exclude the email and replace with normalized email
  const { password, email, ...userProperties } = userIn

  // Generate hashed password
  const hashedPassword = password
    ? await hash(password, config.get('bcryptHashRounds'))
    : undefined
  const newDbUser = {
    createdAt: new Date(),
    uid: userId,
    hashedPassword,
    email: normalizedEmail,
    aliases: JSON.stringify([]),
    properties: JSON.stringify(userProperties)
  }

  await knex('users')
    .where({ uid: userId })
    .update(newDbUser)

  return fromDbUser(newDbUser)
}

export const createUserId = async () => {
  const userId = uuid()
  await knex('users').insert({ createdAt: new Date(), uid: userId })
  return userId
}

export const addAlias = async (userId, alias) => {
  if (!alias) {
    return
  }
  const user = await knex('users')
    .whereNull('deletedAt')
    .where({ uid: userId })
    .first()
  if (user) {
    const aliases = fromJsonb(user.aliases)
    const existingAlias = _find(aliases, a => a === alias)
    if (!existingAlias) {
      aliases.push(alias)
      // Update the aliases in the DB
      await knex('users')
        .whereNull('deletedAt')
        .where({ uid: userId })
        .update({
          aliases: JSON.stringify(aliases)
        })
    }
  } else {
    throw new Error('addAlias: userId not found')
  }
}

export const getAssessment = async name => {
  const questions = await knex('assessment_quiz')
    .leftJoin(
      'assessment_quiz_questions',
      'assessment_quiz.id',
      '=',
      'assessment_quiz_questions.quiz_id'
    )
    .leftJoin(
      'assessment_questions',
      'assessment_quiz_questions.question_id',
      '=',
      'assessment_questions.id'
    )
    .where({
      name
    })
    .select(
      'quiz_id',
      'question_id',
      'text',
      'promptLeft',
      'promptRight',
      'negative'
    )

  const configurationData = await knex('assessment_configuration')
    .orderBy('createdAt', 'desc')
    .first('config')

  const configuration = fromJsonb(configurationData.config)
  configuration.quizId = (_head(questions) || {}).quiz_id

  return {
    name,
    configuration,
    questions: questions.map(q => _omit(q, ['quiz_id']))
  }
}

export const answerQuestion = async (userId, answer) => {
  const row = {
    createdAt: new Date(),
    answer_id: uuid(),
    user_id: userId,
    quiz_id: answer.quizId,
    question_id: answer.questionId,
    value: answer.value
  }
  await knex('assessment_question_answers').insert(row)
  return row.answer_id
}

export const answerQuiz = async (userId, response) => {
  const row = {
    createdAt: new Date(),
    response_id: uuid(),
    user_id: userId,
    quiz_id: response.quizId,
    response: JSON.stringify(response)
  }
  await knex('assessment_quiz_responses').insert(row)
  return row.response_id
}

export const getAssessmentResult = async responseId => {
  const quizResponse = await knex('assessment_quiz_responses')
    .where({ response_id: responseId })
    .first()

  if (!quizResponse) {
    throw new Error(`No response for requested ID=${responseId}`)
  }

  const {
    createdAt,
    response,
    quiz_id: quizId,
    user_id: originalUserId
  } = quizResponse
  const responseObj = fromJsonb(response)
  const { contactInfo, answers } = responseObj

  // Reduce answers to a map, keyed by questionId
  const answersMap = answers.reduce((acc, { questionId, ...rest }) => {
    acc[questionId] = rest
    return acc
  }, {})

  // Augment answers with more information about each question
  const questions = await knex('assessment_questions')
    .leftJoin(
      'assessment_questions_competencies',
      'assessment_questions.id',
      '=',
      'assessment_questions_competencies.question_id'
    )
    .leftJoin(
      'assessment_competencies',
      'assessment_questions_competencies.competency_id',
      '=',
      'assessment_competencies.id'
    )
    .whereIn('question_id', Object.keys(answersMap))
    .select('question_id', 'competency_id', 'score', 'negative', 'text')

  // Reduce questions to a map, keyed by questionId, merged with answersMap
  const questionsMap = questions.reduce(
    (acc, { question_id: questionId, ...rest }) => {
      const merged = { ...answersMap[questionId], ...rest }
      const {
        value,
        hasBeenRespondedTo,
        answerId,
        competency_id: competencyId,
        score,
        negative,
        text
      } = merged
      // For a negative question, low scores are good & vice-versa
      const normalizedScore = !negative ? value : score - value
      acc[questionId] = {
        text,
        answerId,
        competencyId,
        hasBeenRespondedTo,
        originalScore: value,
        normalizedScore,
        total: score
      }
      return acc
    },
    {}
  )

  const quiz = await knex('assessment_quiz')
    .where({ id: quizId })
    .first()
  const { name: quizName, rubric } = quiz
  const quizRubric = fromJsonb(rubric)

  const retval = {
    responseId,
    quizTimestamp: createdAt,
    originalUserId,
    quizId,
    quizName,
    quizRubric,
    contactInfo,
    questions: questionsMap
  }

  // console.log(`getAssessmentResult: ${JSON.stringify(retval, null, 2)}`)

  return retval
}

export const getCompetencies = async () => {
  const competencies = await knex('assessment_competencies')
  return competencies
}
