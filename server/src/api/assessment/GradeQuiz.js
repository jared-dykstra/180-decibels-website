export default ({ quizRubric, response, competencies }) => {
  const { questions } = response

  const getGrade = ({ competency, score }) => {
    if (score.total < 1) {
      return undefined
    }

    const rubric = quizRubric[competency]
    // rubric.threshold is assumed to be a string in the form: '50%'
    const rubricThreshold = parseFloat(rubric.threshold) / 100.0
    const percent = score.earned / score.total
    return {
      threshold: rubricThreshold,
      score: percent,
      comment:
        percent > rubricThreshold ? rubric.highComment : rubric.lowComment
    }
  }

  const getScore = ({ competency }) =>
    Object.entries(questions).reduce(
      (
        acc,
        [
          questionId,
          { normalizedScore, total, hasBeenRespondedTo, competencyId }
        ]
      ) => {
        // Skip questions which aren't for the requested competency
        if (competencyId !== competency) {
          return acc
        }
        // Skip questions which haven't been answered
        if (!hasBeenRespondedTo) {
          return acc
        }
        return {
          total: acc.total + total,
          earned: acc.earned + normalizedScore
        }
      },
      {
        total: 0,
        earned: 0
      }
    )

  const grades = competencies.reduce((acc, { id: competency, ...rest }) => {
    const score = getScore({ competency })
    const grade = getGrade({ competency, score })

    acc[competency] = {
      ...rest,
      ...grade
    }
    return acc
  }, {})

  return grades
}
