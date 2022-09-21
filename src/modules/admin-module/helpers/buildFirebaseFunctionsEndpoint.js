const buildFirebaseFunctionsEndpoint = (path, params) => {
  let computedPath = path

  Object.entries(params).forEach(
    ([paramThatShouldBeReplaced, valueOfParam]) => {
      computedPath = computedPath.replace(
        `:${paramThatShouldBeReplaced}`,
        valueOfParam
      )
    }
  )

  return computedPath
}

export default buildFirebaseFunctionsEndpoint
