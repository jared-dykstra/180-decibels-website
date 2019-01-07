const ID_ACCOUNTABILITY = '3f23f659-3a52-42bb-91e1-7380d66286a2'
const ID_PEOPLE = '259db89c-a10c-432b-9291-6c6761115c15'
const ID_STRATEGY = 'ff8bccc2-82cc-429c-b1ae-dc45a656b605'

const config = {
  questions: {
    'f7ca272e-6c96-4ee9-96a2-6e5d33012478': {
      text: 'I regularly revise and communicate a long-term plan for my team',
      accountability: 10,
      people: 0,
      strategy: 0,
      promptLeft: 'never',
      promptRight: 'every month',
      negative: false
    },
    '2e18a618-2cf0-4bc2-bb46-49669d68fe37': {
      text: "We use the term 'accountability' often",
      accountability: 10,
      people: 0,
      strategy: 0,
      promptLeft: 'rarely',
      promptRight: 'all the time',
      negative: false
    },
    'd8bcb004-ef11-42ce-8d5f-8f51d8a32362': {
      text: 'Everyone knows what their accountabilities are',
      accountability: 10,
      people: 0,
      strategy: 0,
      promptLeft: 'disagree',
      promptRight: 'agree',
      negative: false
    },
    '49155d84-7e77-4457-9caa-68f38bba8517': {
      text:
        'Everyone gets their accountabilities done without needing to be reminded',
      accountability: 10,
      people: 0,
      strategy: 0,
      promptLeft: 'disagree',
      promptRight: 'agree',
      negative: false
    },
    'f2f69dd3-13b9-4ea2-9d7e-147c8f79974d': {
      text:
        "We always take the time to make sure that everyone involved knows exactly what 'done' means",
      accountability: 10,
      people: 0,
      strategy: 0,
      promptLeft: 'disagree',
      promptRight: 'agree',
      negative: false
    },
    '2f94c579-808a-469a-a889-33d5c2cf92ee': {
      text:
        'Everyone knows where we are going and HOW we are going to get there',
      accountability: 10,
      people: 0,
      strategy: 0,
      promptLeft: 'disagree',
      promptRight: 'agree',
      negative: false
    },
    '99eaebca-2cc8-4915-85d4-3f1c2b02afe5': {
      text: 'EVERYONE has specific weekly numbers that they need to hit',
      accountability: 10,
      people: 0,
      strategy: 0,
      promptLeft: 'few people',
      promptRight: 'everyone',
      negative: false
    },
    '4043abdd-0610-4fde-9ee6-3fd65536266f': {
      text: 'Activity assignments are published for everyone to see each week',
      accountability: 10,
      people: 0,
      strategy: 0,
      promptLeft: 'disagree',
      promptRight: 'agree',
      negative: false
    },
    '652dc11b-c235-4158-993e-7474e48b89f0': {
      text:
        'Everyone knows when someone misses their weekly assigned activities',
      accountability: 10,
      people: 0,
      strategy: 0,
      promptLeft: 'disagree',
      promptRight: 'agree',
      negative: false
    },
    'd2acdade-4bdc-4207-beba-cae592c06316': {
      text: 'We have weekly meetings, but no one is held accountable',
      accountability: 10,
      people: 0,
      strategy: 0,
      promptLeft: 'disagree',
      promptRight: 'agree',
      negative: true
    },
    'fb6480e9-f721-4109-82b5-d144b3ca75e8': {
      text: 'There is often conflict and drama between team members',
      accountability: 10,
      people: 10,
      strategy: 0,
      promptLeft: 'never',
      promptRight: 'regularly',
      negative: true
    },
    '2c958994-9800-4856-954f-b59e1f8c26ce': {
      text:
        "When a person misses deadlines or doesn't get things done, no one confronts them",
      accountability: 10,
      people: 10,
      strategy: 0,
      promptLeft: 'disagree',
      promptRight: 'agree',
      negative: true
    },
    'a657bead-d13e-4510-9c9f-a02583447cb3': {
      text: 'We regularly set 90-day objectives',
      accountability: 10,
      people: 0,
      strategy: 10,
      promptLeft: 'never',
      promptRight: 'every quarter',
      negative: false
    },
    '0be22c6d-15da-4b76-a952-2ddd06a4c6b1': {
      text: 'We use long-term objectives to guide weekly task assignments',
      accountability: 10,
      people: 0,
      strategy: 10,
      promptLeft: 'rarely',
      promptRight: 'always',
      negative: false
    },
    'e17af4ba-2c80-4491-9062-2c5140b03753': {
      text:
        'EACH team member has autonomy to make key decisions in performing their role',
      accountability: 0,
      people: 10,
      strategy: 0,
      promptLeft: 'no autonomy',
      promptRight: 'lots',
      negative: false
    },
    '38a2c293-ffd0-4b93-8f4b-8c539eefd071': {
      text:
        "Everyone knows exactly what their boss expects them to do; how to be a 'Rockstar' in their job",
      accountability: 0,
      people: 10,
      strategy: 0,
      promptLeft: 'disagree',
      promptRight: 'agree',
      negative: false
    },
    '47a60ccd-815a-442d-ba3c-69186afb1902': {
      text:
        'Team members have defined areas where they have decision making authority',
      accountability: 0,
      people: 10,
      strategy: 0,
      promptLeft: 'no members',
      promptRight: 'all members',
      negative: false
    },
    'b35aa690-1695-469c-a6b2-b46ce2cd80ea': {
      text:
        'Our organization has shared overarching rules that outline expectations of staff behavior',
      accountability: 0,
      people: 10,
      strategy: 0,
      promptLeft: 'disagree',
      promptRight: 'agree',
      negative: false
    },
    '459d0dff-6886-4046-94d6-342b2fc5bd92': {
      text:
        "Staff feels that leadership team members aren't in agreement on priorities",
      accountability: 0,
      people: 10,
      strategy: 0,
      promptLeft: 'disagreement',
      promptRight: 'aligned',
      negative: true
    },
    'bdda783c-acb6-4fff-8b2f-4b477f0d4b9a': {
      text:
        'People are aware of when they in-line with expected behavior or not',
      accountability: 0,
      people: 10,
      strategy: 0,
      promptLeft: 'disagree',
      promptRight: 'agree',
      negative: false
    },
    '8bd55f54-5115-4638-8627-a7d7ae0b463e': {
      text:
        'Our leadership team takes time every few months to spend dedicated time thinking and planning',
      accountability: 0,
      people: 0,
      strategy: 10,
      promptLeft: 'never',
      promptRight: 'regularly',
      negative: false
    },
    'e0963db4-bebf-4640-868b-87792985a16b': {
      text:
        'All of our organizational long-term goals are clear, specific and measurable',
      accountability: 0,
      people: 0,
      strategy: 10,
      promptLeft: 'few',
      promptRight: 'all',
      negative: false
    },
    'd790d95d-d48c-4488-a1cb-3d1f462f077c': {
      text: 'Leadership team members undermine one another in front of staff',
      accountability: 0,
      people: 10,
      strategy: 10,
      promptLeft: 'never',
      promptRight: 'often',
      negative: true
    },
    '075e1d54-f9c2-410d-a87e-77616da48d2a': {
      text:
        'Everyone in the organization can articulate the long-term goals and top priorities',
      accountability: 0,
      people: 0,
      strategy: 10,
      promptLeft: 'no',
      promptRight: 'yes',
      negative: false
    },
    '7a819ca1-768b-4c53-9621-efbd44c18eff': {
      text: 'People disagree about which things to get done first',
      accountability: 0,
      people: 0,
      strategy: 10,
      promptLeft: 'rarely',
      promptRight: 'usually',
      negative: true
    },
    'fa801864-0cb6-46e5-9c31-45dd06bb2a4c': {
      text: 'We have a shared Accountability Chart',
      accountability: 0,
      people: 0,
      strategy: 10,
      promptLeft: 'No',
      promptRight: 'Yes',
      negative: false
    },
    '1bdb7127-cb9b-473e-875f-42a683d3974a': {
      text:
        'As a business leader, I reinforce the plan and priorities with my team at least once a week, informally or formally',
      accountability: 0,
      people: 0,
      strategy: 10,
      promptLeft: 'rarely',
      promptRight: 'each week',
      negative: false
    },
    'e5636566-ef8b-4934-8ae2-2e2a815539ec': {
      text:
        'It is difficult to tell if staff are actually doing the right things from week to week to help us to achieve our organizational goals',
      accountability: 0,
      people: 0,
      strategy: 10,
      promptLeft: 'disagree',
      promptRight: 'agree',
      negative: true
    }
  },
  volume: {
    min: 0,
    max: 10,
    step: 2
  },
  helpMyTeam: {
    rubric: {
      [ID_ACCOUNTABILITY]: {
        highComment:
          'Nicely done! It looks like you are doing a great job with team Accountability.',
        highLink: 'Here are a few additional tips...',
        lowComment:
          'It looks like your team may be a lacking in Accountability which, is essential for a high-performing team.',
        lowLink:
          'Here are a few tips to help you develop your team Accountability...',
        threshold: '75%'
      },
      [ID_PEOPLE]: {
        highComment:
          'Nicely done! It looks like you have a good People fit on your team.',
        highLink:
          'Here are a few additional tips to help maintain this competency...',
        lowComment:
          'It looks like you may not have the ‘right’ People in the right roles.',
        lowLink:
          'Here are a few tips to help you with common People challenges...',
        threshold: '75%'
      },
      [ID_STRATEGY]: {
        highComment:
          'Nicely done! It looks like you have solid business Strategy.',
        highLink:
          'Here are a few additional tips to help maintain this competency...',
        lowComment:
          'It looks like your Strategic Planning could benefit from a little work.',
        lowLink:
          'Here are a few tips to help you with developing a solid, practical strategic plan....',
        threshold: '75%'
      }
    },
    questions: [
      // All Questions
      'f7ca272e-6c96-4ee9-96a2-6e5d33012478',
      '2e18a618-2cf0-4bc2-bb46-49669d68fe37',
      'd8bcb004-ef11-42ce-8d5f-8f51d8a32362',
      '49155d84-7e77-4457-9caa-68f38bba8517',
      'f2f69dd3-13b9-4ea2-9d7e-147c8f79974d',
      '2f94c579-808a-469a-a889-33d5c2cf92ee',
      '99eaebca-2cc8-4915-85d4-3f1c2b02afe5',
      '4043abdd-0610-4fde-9ee6-3fd65536266f',
      '652dc11b-c235-4158-993e-7474e48b89f0',
      'd2acdade-4bdc-4207-beba-cae592c06316',
      'fb6480e9-f721-4109-82b5-d144b3ca75e8',
      '2c958994-9800-4856-954f-b59e1f8c26ce',
      'a657bead-d13e-4510-9c9f-a02583447cb3',
      '0be22c6d-15da-4b76-a952-2ddd06a4c6b1',
      'e17af4ba-2c80-4491-9062-2c5140b03753',
      '38a2c293-ffd0-4b93-8f4b-8c539eefd071',
      '47a60ccd-815a-442d-ba3c-69186afb1902',
      'b35aa690-1695-469c-a6b2-b46ce2cd80ea',
      '459d0dff-6886-4046-94d6-342b2fc5bd92',
      'bdda783c-acb6-4fff-8b2f-4b477f0d4b9a',
      '8bd55f54-5115-4638-8627-a7d7ae0b463e',
      'e0963db4-bebf-4640-868b-87792985a16b',
      'd790d95d-d48c-4488-a1cb-3d1f462f077c',
      '075e1d54-f9c2-410d-a87e-77616da48d2a',
      '7a819ca1-768b-4c53-9621-efbd44c18eff',
      'fa801864-0cb6-46e5-9c31-45dd06bb2a4c',
      '1bdb7127-cb9b-473e-875f-42a683d3974a',
      'e5636566-ef8b-4934-8ae2-2e2a815539ec'
    ]
  },
  helpMe: {
    rubric: {
      [ID_ACCOUNTABILITY]: {
        highComment:
          'Nicely done! It looks like you are doing a great job with team Accountability.',
        highLink: 'Here are a few additional tips...',
        lowComment:
          'It looks like your team may be a lacking in Accountability which, is essential for a high-performing team.',
        lowLink:
          'Here are a few tips to help you develop your team Accountability...',
        threshold: '75%'
      },
      [ID_PEOPLE]: {
        highComment:
          'Nicely done! It looks like you have a good People fit on your team.',
        highLink:
          'Here are a few additional tips to help maintain this competency...',
        lowComment:
          'It looks like you may not have the ‘right’ People in the right roles.',
        lowLink:
          'Here are a few tips to help you with common People challenges...',
        threshold: '75%'
      },
      [ID_STRATEGY]: {
        highComment:
          'Nicely done! It looks like you have solid business Strategy.',
        highLink:
          'Here are a few additional tips to help maintain this competency...',
        lowComment:
          'It looks like your Strategic Planning could benefit from a little work.',
        lowLink:
          'Here are a few tips to help you with developing a solid, practical strategic plan....',
        threshold: '75%'
      }
    },
    questions: [
      // All Questions
      'f7ca272e-6c96-4ee9-96a2-6e5d33012478',
      '2e18a618-2cf0-4bc2-bb46-49669d68fe37',
      'd8bcb004-ef11-42ce-8d5f-8f51d8a32362',
      '49155d84-7e77-4457-9caa-68f38bba8517',
      'f2f69dd3-13b9-4ea2-9d7e-147c8f79974d',
      '2f94c579-808a-469a-a889-33d5c2cf92ee',
      '99eaebca-2cc8-4915-85d4-3f1c2b02afe5',
      '4043abdd-0610-4fde-9ee6-3fd65536266f',
      '652dc11b-c235-4158-993e-7474e48b89f0',
      'd2acdade-4bdc-4207-beba-cae592c06316',
      'fb6480e9-f721-4109-82b5-d144b3ca75e8',
      '2c958994-9800-4856-954f-b59e1f8c26ce',
      'a657bead-d13e-4510-9c9f-a02583447cb3',
      '0be22c6d-15da-4b76-a952-2ddd06a4c6b1',
      'e17af4ba-2c80-4491-9062-2c5140b03753',
      '38a2c293-ffd0-4b93-8f4b-8c539eefd071',
      '47a60ccd-815a-442d-ba3c-69186afb1902',
      'b35aa690-1695-469c-a6b2-b46ce2cd80ea',
      '459d0dff-6886-4046-94d6-342b2fc5bd92',
      'bdda783c-acb6-4fff-8b2f-4b477f0d4b9a',
      '8bd55f54-5115-4638-8627-a7d7ae0b463e',
      'e0963db4-bebf-4640-868b-87792985a16b',
      'd790d95d-d48c-4488-a1cb-3d1f462f077c',
      '075e1d54-f9c2-410d-a87e-77616da48d2a',
      '7a819ca1-768b-4c53-9621-efbd44c18eff',
      'fa801864-0cb6-46e5-9c31-45dd06bb2a4c',
      '1bdb7127-cb9b-473e-875f-42a683d3974a',
      'e5636566-ef8b-4934-8ae2-2e2a815539ec'
    ]
  }
}

const T_CONFIG = 'assessment_configuration'
const T_COMPETENCIES = 'assessment_competencies'
const T_QUESTIONS = 'assessment_questions'
const T_QUESTIONS_COMPETENCIES = 'assessment_questions_competencies'
const T_QUIZ = 'assessment_quiz'
const T_QUIZ_QUESTIONS = 'assessment_quiz_questions'

exports.up = async (knex, Promise) => {
  await knex.schema.createTable(T_CONFIG, t => {
    t.dateTime('createdAt')
      .notNull()
      .primary()
    t.jsonb('config').notNull()
    t.index('createdAt')
  })
  await knex(T_CONFIG).insert({
    createdAt: new Date(),
    config: JSON.stringify({
      volume: {
        min: 0,
        max: 10,
        step: 2
      }
    })
  })

  // Define core competencies
  await knex.schema.createTable(T_COMPETENCIES, t => {
    t.uuid('id')
      .notNull()
      .primary()
    t.text('name')
      .notNull()
      .unique()
    t.integer('order')
    t.index('order')
  })
  await knex(T_COMPETENCIES).insert({
    id: ID_ACCOUNTABILITY,
    name: 'Accountability',
    order: 3
  })
  await knex(T_COMPETENCIES).insert({
    id: ID_PEOPLE,
    name: 'People',
    order: 2
  })
  await knex(T_COMPETENCIES).insert({
    id: ID_STRATEGY,
    name: 'Strategy & Planning',
    order: 1
  })

  // Define assessment questions & scores
  await knex.schema.createTable(T_QUESTIONS, t => {
    t.uuid('id')
      .notNull()
      .primary()
    t.text('text').notNull()
    t.text('promptLeft').notNull()
    t.text('promptRight').notNull()
    t.boolean('negative').notNull()
  })

  await knex.schema.createTable(T_QUESTIONS_COMPETENCIES, t => {
    t.uuid('question_id')
      .notNull()
      .references('id')
      .inTable(T_QUESTIONS)
    t.uuid('competency_id')
      .notNull()
      .references('id')
      .inTable(T_COMPETENCIES)
    t.integer('score').notNull()
    t.unique(['question_id', 'competency_id'])
  })

  await Promise.all(
    Object.entries(config.questions).map(async ([k, v]) => {
      const { accountability, people, strategy, ...rest } = v
      await knex(T_QUESTIONS).insert({
        id: k,
        ...rest
      })
      if (accountability) {
        await knex(T_QUESTIONS_COMPETENCIES).insert({
          question_id: k,
          competency_id: ID_ACCOUNTABILITY,
          score: accountability
        })
      }
      if (people) {
        await knex(T_QUESTIONS_COMPETENCIES).insert({
          question_id: k,
          competency_id: ID_PEOPLE,
          score: people
        })
      }
      if (strategy) {
        await knex(T_QUESTIONS_COMPETENCIES).insert({
          question_id: k,
          competency_id: ID_STRATEGY,
          score: strategy
        })
      }
    })
  )

  // Define Assessment Quizzes
  await knex.schema.createTable(T_QUIZ, t => {
    t.uuid('id')
      .notNull()
      .primary()
    t.text('name')
      .notNull()
      .unique()
    t.jsonb('rubric').notNull()
  })
  const ID_HELP_ME = '439a564d-adc9-497b-9dba-a9d8de6caf75'
  await knex(T_QUIZ).insert({
    id: ID_HELP_ME,
    name: 'helpMe',
    rubric: JSON.stringify(config.helpMe.rubric)
  })
  const ID_HELP_MY_TEAM = '853020dd-ebc6-458c-8bf2-eb5a1cc6101f'
  await knex(T_QUIZ).insert({
    id: ID_HELP_MY_TEAM,
    name: 'helpMyTeam',
    rubric: JSON.stringify(config.helpMyTeam.rubric)
  })

  // Map questions to Quizzes
  await knex.schema.createTable(T_QUIZ_QUESTIONS, t => {
    t.uuid('quiz_id')
      .notNull()
      .references('id')
      .inTable(T_QUIZ)
    t.uuid('question_id')
      .notNull()
      .references('id')
      .inTable(T_QUESTIONS)
    t.unique(['quiz_id', 'question_id'])
  })

  await Promise.all(
    config.helpMyTeam.questions.map(async id => {
      await knex(T_QUIZ_QUESTIONS).insert({
        quiz_id: ID_HELP_MY_TEAM,
        question_id: id
      })
    })
  )

  await Promise.all(
    config.helpMe.questions.map(async id => {
      await knex(T_QUIZ_QUESTIONS).insert({
        quiz_id: ID_HELP_ME,
        question_id: id
      })
    })
  )
}

exports.down = async (knex, Promise) => {
  knex.schema.dropTableIfExists(T_CONFIG)
  knex.schema.dropTableIfExists(T_QUESTIONS_COMPETENCIES)
  knex.schema.dropTableIfExists(T_QUESTIONS)
  knex.schema.dropTableIfExists(T_COMPETENCIES)
}
