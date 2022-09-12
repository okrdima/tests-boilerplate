import _ from 'lodash'
import normalizeObject from './normalizeObject'

/**
 * It compares two objects and returns an object with the keys that are different and the values that
 * are different
 * @param firstObject - The first object to compare.
 * @param secondObject - The object that you want to compare against.
 */
const compareObjects = (firstObject, secondObject) => {
  const compareObject = _.reduce(
    firstObject,
    (result, value, key) =>
      _.isEqual(value, secondObject[key])
        ? result
        : {
            ...result,
            [key]: { prev: firstObject[key], next: secondObject[key] }
          },
    {}
  )

  return normalizeObject(compareObject)
}

export default compareObjects
