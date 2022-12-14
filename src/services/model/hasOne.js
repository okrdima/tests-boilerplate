const DEFAULT_TYPE = 'relationship'
const DEFAULT_DATATYPE = 'hasOne'

const hasOne = (ref, options) => {
  try {
    if (!ref) throw new Error('No ref provided to the hasOne method')
  } catch (e) {
    console.error(e)
  }
  return {
    type: DEFAULT_TYPE,
    dataType: DEFAULT_DATATYPE,
    ref,
    ...options
  }
}

export default hasOne
