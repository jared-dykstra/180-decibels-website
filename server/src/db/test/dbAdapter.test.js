import { getAssessment } from '../dbAdapter'

// TODO: Change from integration test to unit test--this test requires a non-mocked database
it.skip('gets a quiz', async () => {
  const testName = 'Help Me'

  const quiz = await getAssessment(testName)

  // console.log(`Quiz=${JSON.stringify(quiz, null, 2)}`)
  expect(quiz.name).toEqual(testName)
  expect(quiz.configuration).toBeDefined()
  expect(quiz.questions).toBeDefined()
})
