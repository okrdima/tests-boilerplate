const normalizeObject = (obj) =>
  Object.keys(obj).reduce((result, key) => {
    if (typeof obj[key] === 'object') {
      return { ...result, [key]: normalizeObject(obj[key]) }
    } else if (typeof obj[key] === 'undefined') {
      return { ...result, [key]: null }
    } else {
      return { ...result, [key]: obj[key] }
    }
  }, {})

export default normalizeObject
