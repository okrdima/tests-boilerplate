import { useCollection } from 'services/api/rest'
import { useMemo } from 'react'

const collection = 'materials'

const useGetMaterials = (props) => {
  const query = useMemo(() => ({ ref: collection, ...props }), [props])
  const [value, loading, error, next, loadingMore, loadMoreAvailable] =
    useCollection(query)

  return [value, loading, error, next, loadingMore, loadMoreAvailable]
}

export default useGetMaterials
