const validateLengthText = (textEqualZero, textWithTrimEqualZero) => {
  return () => ({
    validator(_, value) {
      if (value?.length === 0) {
        return Promise.reject(new Error(textEqualZero))
      }
      if (value?.trim()?.length > 0) {
        return Promise.resolve()
      } else {
        return Promise.reject(new Error(textWithTrimEqualZero))
      }
    }
  })
}

export default validateLengthText
