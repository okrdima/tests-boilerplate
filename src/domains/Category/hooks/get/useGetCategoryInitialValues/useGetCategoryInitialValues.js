import { useMemo } from 'react'
import { useLoading } from 'hooks'
import { useDocument } from 'services/api/rest'

const useGetCategoryInitialValues = (id) => {
  // [DATA_FETCH]
  const [category, categoryLoading] = useDocument({
    ref: id ? `categories/${id}` : null
  })

  // [COMPUTED_PROPERTIES]
  const initialValues = useMemo(
    () => ({
      category
    }),
    [category]
  )
  const loadings = useMemo(
    () => (id ? [!category, categoryLoading] : []),
    [id, category, categoryLoading]
  )

  // [ADDITIONAL_HOOKS]
  const loading = useLoading(loadings)

  return [initialValues, loading]
}

export default useGetCategoryInitialValues
