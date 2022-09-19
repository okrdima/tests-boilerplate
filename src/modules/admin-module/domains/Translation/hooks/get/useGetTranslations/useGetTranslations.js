import { get, getDatabase, ref } from 'firebase/database'
import { useCallback, useEffect, useState } from 'react'

import { formatTranslations } from '../../../helpers'
import { message } from 'antd'

const useGetTranslations = (appName) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const db = getDatabase()
      const path = `translations/${appName}`
      const dbRef = ref(db, path)
      const snapshot = await get(dbRef)

      const data = snapshot.val()

      setData(formatTranslations(data))
    } catch (error) {
      message.error(error.message)
    }
    setLoading(false)
  }, [appName])

  useEffect(() => {
    appName && fetchData()
  }, [appName, fetchData])

  return [data, loading, fetchData]
}

export default useGetTranslations
