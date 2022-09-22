import { useEffect, useState } from 'react'
import { getDocument } from 'services/api/rest'

const useGetMaterialMaterialType = (material) => {
  const [materialType, setMaterialType] = useState(null)
  const [loading, setLoading] = useState(!!material?.type)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const document = await getDocument('materialTypes', material.type)
      setMaterialType(document)
      setLoading(false)
    }
    material?.type && fetchData()
  }, [material])

  return [materialType, loading]
}

export default useGetMaterialMaterialType
