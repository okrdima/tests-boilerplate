import { useEffect, useState } from 'react'
import { getDocument } from 'services/api/rest'

const useGetArticleMaterials = (article) => {
  const [materials, setMaterials] = useState([])
  const [loading, setLoading] = useState(!!article?.materials?.length)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const promises = article.materials.map((material) =>
        getDocument('materials', material)
      )
      const data = await Promise.all(promises)
      setMaterials(data)
      setLoading(false)
    }

    article?.materials?.length && fetchData()
  }, [article])

  return [materials, loading]
}

export default useGetArticleMaterials
