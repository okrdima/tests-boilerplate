import _ from 'lodash'
import normalizeObject from './normalizeObject'

const compareObjects = (a, b) => {
  const compareObject = _.reduce(
    a,
    (result, value, key) =>
      _.isEqual(value, b[key])
        ? result
        : { ...result, [key]: { prev: a[key], next: b[key] } },
    {}
  )

  return normalizeObject(compareObject)
}

export default compareObjects
