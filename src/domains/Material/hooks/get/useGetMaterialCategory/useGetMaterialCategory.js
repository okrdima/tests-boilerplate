import { useEffect, useState } from 'react'
import { getDocument } from 'services/api/rest'

const useGetMaterialCategory = (material) => {
  const [category, setCategory] = useState(null)
  const [loading, setLoading] = useState(!!material?.category)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const document = await getDocument('categories', material.category)
      setCategory(document)
      setLoading(false)
    }
    material?.category && fetchData()
  }, [material])

  return [category, loading]
}

export default useGetMaterialCategory
