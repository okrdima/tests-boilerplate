import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import firestore from 'services/firebase/firestore'

/**
 * It takes a Firestore document reference and returns the document's data, a loading state, and an
 * error state
 * @param ref {string} - The document reference
 * @param where {array} - The query where clause
 * @returns An array with the value, loading, and error.
 */
const useDocument = (props) => {
  const [value, setValue] = useState()
  const [loading, setLoading] = useState(!!props.ref)
  const [error, setError] = useState()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const docRef = doc(firestore, props.ref)
        const querySnapshot = await getDoc(docRef)
        setValue(querySnapshot.data())
        setLoading(false)
      } catch (err) {
        setError(err)
      }
    }
    fetchData()
  }, [props?.ref])

  return [value, loading, error]
}

useDocument.propTypes = {
  ref: PropTypes.string.isRequired,
  where: PropTypes.array
}

export default useDocument
