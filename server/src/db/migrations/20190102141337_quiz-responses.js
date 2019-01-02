const T_QUIZ = 'assessment_quiz'
const T_QUESTIONS = 'assessment_questions'
const T_QUIZ_RESPONSES = 'assessment_quiz_responses'
const T_QUESTION_ANSWERS = 'assessment_question_answers'

exports.up = async (knex, Promise) => {
  await knex.schema.createTable(T_QUESTION_ANSWERS, t => {
    t.dateTime('createdAt')
      .notNull()
      .primary()
    t.uuid('question_id')
      .notNull()
      .references('id')
      .inTable(T_QUESTIONS)
    t.integer('value').notNull()
    // If cookies are disabled, a userID might not be available.
    // Also, if multiple devices are used, the user_id could be coalesced in the aliases
    // Consequently, there is no foreign key constraint on user_id
    t.uuid('user_id')
    t.uuid('quiz_id')
      .notNull()
      .references('id')
      .inTable(T_QUIZ)
    t.uuid('answer_id').notNull()
    t.unique('answer_id')
    t.index('user_id')
  })

  await knex.schema.createTable(T_QUIZ_RESPONSES, t => {
    t.dateTime('createdAt')
      .notNull()
      .primary()
    t.uuid('response_id').notNull()
    // If cookies are disabled, a userID might not be available.
    // Also, if multiple devices are used, the user_id could be coalesced in the aliases
    // Consequently, there is no foreign key constraint on user_id
    t.uuid('user_id')
    t.uuid('quiz_id')
      .notNull()
      .references('id')
      .inTable(T_QUIZ)
    t.jsonb('response').notNull()
    t.unique('response_id')
    t.index('user_id')
  })
}

exports.down = async (knex, Promise) => {
  await knex.schema.dropTableIfExists(T_QUESTION_ANSWERS)
  await knex.schema.dropTableIfExists(T_QUIZ_RESPONSES)
}
