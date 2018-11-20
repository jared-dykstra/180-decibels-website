import { find as _find, isNil as _isNil } from 'lodash'

const getQuestionFromId = ({ questions, questionId }) =>
  _find(questions, q => q.id === questionId)

/**
 * Sum the total available, and total earned points for a specific dimension.
 * If a question is "muted", it doesn't earn points--but the total possible earned
 * points for that dimension is reduced, as it's not counted.
 * @param {*} p
 * @param {Object} p.responses User's responses to each question
 * @param {Array} p.questions
 * @param {string} p.dimensionName The name of the desired dimension
 * @param {int} p.maxVolume The maximum volume number that could have been awarded to this question
 */
const sumDimension = ({ responses, questions, dimensionName, maxVolume }) =>
  Object.entries(responses).reduce(
    (acc, [questionId, response]) => {
      const { volume, mute } = response

      // If muted, skip this response
      if (mute || _isNil(volume)) {
        return acc
      }

      // Accumulate the chosen volume times the weighting for this dimension
      const normalizedVolume = volume || 0
      const currentQuestion = getQuestionFromId({ questions, questionId })
      const currentDimensionWeight = currentQuestion[dimensionName]
      return {
        points: acc.points + normalizedVolume * currentDimensionWeight,
        maxPoints: acc.maxPoints + maxVolume * currentDimensionWeight
      }
    },
    { points: 0, maxPoints: 0 }
  )

/**
 * Calculate a score percentage for each dimension.  Use the percentage to select an appropriate comment
 * based on the dimension's configured threshold.
 * @param {*} p
 * @param {Object} p.config The assessment's configuration, containing a definition of dimensions, questions, and volume settings
 * @param {Object} p.responses User's responses to each question
 */
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
