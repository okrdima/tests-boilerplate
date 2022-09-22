import { useEffect, useState } from 'react'
import { getDocument } from 'services/api/rest'

const useGetMaterialKeywords = (material) => {
  const [keywords, setKeywords] = useState([])
  const [loading, setLoading] = useState(!!material?.keywords?.length)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const promises = material.keywords.map((keyword) =>
        getDocument('keywords', keyword)
      )
      const data = await Promise.all(promises)
      setKeywords(data)
      setLoading(false)
    }

    material?.keywords?.length && fetchData()
  }, [material])

  return [keywords, loading]
}

export default useGetMaterialKeywords
