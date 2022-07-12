import { useCallback, useMemo, useState } from 'react'

// Define a custom hook that returns a state and a function to update it.
const useStateWithStorage = (initialValue, fieldName) => {
  // [COMPUTED_PROPERTIES]
  const initialValueComputed = useMemo(() => {
    const json = fieldName && localStorage?.getItem?.(fieldName)
    return json ? JSON.parse(json) : initialValue
  }, [fieldName, initialValue])

  // [COMPONENT_STATE_HOOKS]
  const [state, setState] = useState(initialValueComputed)

  // [HANDLERS]
  // Function which takes a new value and updates the state.
  const handleChange = useCallback(
    (param) => {
      if (typeof param === 'function') {
        setState((previousState) => {
          const _value = param(previousState)
          fieldName && localStorage?.setItem(fieldName, JSON.stringify(_value))
          return _value
        })
      } else {
        setState(param)
        fieldName && localStorage?.setItem(fieldName, JSON.stringify(param))
      }
    },
    [fieldName]
  )

  return [state, handleChange]
}

export default useStateWithStorage
