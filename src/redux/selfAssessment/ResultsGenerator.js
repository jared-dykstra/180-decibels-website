import { find as _find } from 'lodash'

const getQuestionFromId = ({ questions, questionId }) =>
  _find(questions, q => q.id === questionId)

const sumDimension = ({ responses, questions, dimensionName, maxVolume }) =>
  Object.entries(responses).reduce(
    (acc2, [questionId, response]) => {
      const { volume, mute } = response

      // If muted, skip this response
      if (mute) {
        return acc2
      }

      // Accumulate the chosen volume times the weighting for this dimension
      const normalizedVolume = volume || 0
      const currentQuestion = getQuestionFromId({ questions, questionId })
      const currentDimensionWeight = currentQuestion[dimensionName]
      return {
        points: acc2.points + normalizedVolume * currentDimensionWeight,
        maxPoints: acc2.maxPoints + maxVolume * currentDimensionWeight
      }
    },
    { points: 0, maxPoints: 0 }
  )

export default ({ config, responses }) => {
  const { dimensions, questions, volume } = config
  const { max: maxVolume } = volume
  return Object.entries(dimensions).reduce(
    (acc, [dimensionName, dimensionConfig]) => {
      const { threshold, highComment, lowComment } = dimensionConfig
      // threshold is assumed to be a string in the form: '50%'
      const numericThreshold = parseFloat(threshold) / 100.0
      const totals = sumDimension({
        responses,
        questions,
        dimensionName,
        maxVolume
      })
      const percentage = totals.points / totals.maxPoints
      const comment = percentage > numericThreshold ? highComment : lowComment
      acc[dimensionName] = {
        percentage,
        comment: percentage > 0 ? comment : null
      }
      return acc
    },
    {}
  )
}
