export default ({ config, responses }) => {
  const { dimensions } = config
  return Object.entries(dimensions).reduce(
    (acc, [dimensionName, dimensionConfig]) => {
      acc[dimensionName] = 'zero'
      return acc
    },
    {}
  )
}
