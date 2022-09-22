import { useMemo } from 'react'
import { useLoading } from 'hooks'
import { useDocument } from 'services/api/rest'
import { useGetArticleMaterials } from 'domains/Article/hooks'

const useGetArticleInitialValues = (id) => {
  // [DATA_FETCH]
  const [article, articleLoading] = useDocument({
    ref: id ? `articles/${id}` : null
  })
  const [materials, materialLoading] = useGetArticleMaterials(article)

  // [COMPUTED_PROPERTIES]
  const initialValues = useMemo(
    () => ({
      article,
      materials
    }),
    [article, materials]
  )
  const loadings = useMemo(
    () => (id ? [!article, articleLoading, materialLoading] : []),
    [id, article, articleLoading, materialLoading]
  )

  // [ADDITIONAL_HOOKS]
  const loading = useLoading(loadings)

  return [initialValues, loading]
}

export default useGetArticleInitialValues
