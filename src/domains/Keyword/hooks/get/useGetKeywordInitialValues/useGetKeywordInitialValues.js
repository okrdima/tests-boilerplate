import { useMemo } from 'react'
import { useLoading } from 'hooks'
import { useDocument } from 'services/api/rest'

const useGetKeywordInitialValues = (id) => {
  // [DATA_FETCH]
  const [keyword, keywordLoading] = useDocument({
    ref: id ? `keywords/${id}` : null
  })

  // [COMPUTED_PROPERTIES]
  const initialValues = useMemo(
    () => ({
      keyword
    }),
    [keyword]
  )
  const loadings = useMemo(
    () => (id ? [!keyword, keywordLoading] : []),
    [id, keyword, keywordLoading]
  )

  // [ADDITIONAL_HOOKS]
  const loading = useLoading(loadings)

  return [initialValues, loading]
}

export default useGetKeywordInitialValues
