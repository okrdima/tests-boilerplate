import { useCallback, useLayoutEffect, useRef } from 'react'

/**
 * It returns a callback that calls the handler passed to it
 * @param handler - The event handler function.
 * @returns A function that calls the handlerRef.current function with the arguments passed to it.
 */
function useEvent(handler) {
  const handlerRef = useRef(null)

  // In a real implementation, this would run before layout effects
  useLayoutEffect(() => {
    handlerRef.current = handler
  })

  return useCallback((...args) => {
    // In a real implementation, this would throw if called during render
    const fn = handlerRef.current
    return fn(...args)
  }, [])
}

export default useEvent
