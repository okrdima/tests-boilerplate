import { useMemo } from 'react'
import { useLoading } from 'hooks'
import { useDocument } from 'services/api/rest'
import {
  useGetMaterialKeywords,
  useGetMaterialCategory,
  useGetMaterialMaterialType
} from 'domains/Material/hooks'

const useGetMaterialInitialValues = (id) => {
  // [DATA_FETCH]
  const [material, materialLoading] = useDocument({
    ref: id ? `materials/${id}` : null
  })
  const [keywords, keywordLoading] = useGetMaterialKeywords(material)
  const [category, categoryLoading] = useGetMaterialCategory(material)
  const [type, materialTypeLoading] = useGetMaterialMaterialType(material)

  // [COMPUTED_PROPERTIES]
  const initialValues = useMemo(
    () => ({
      material,
      keywords,
      category,
      type
    }),
    [material, keywords, category, type]
  )
  const loadings = useMemo(
    () =>
      id
        ? [
            !material,
            materialLoading,
            keywordLoading,
            categoryLoading,
            materialTypeLoading
          ]
        : [],
    [
      id,
      material,
      materialLoading,
      keywordLoading,
      categoryLoading,
      materialTypeLoading
    ]
  )

  // [ADDITIONAL_HOOKS]
  const loading = useLoading(loadings)

  return [initialValues, loading]
}

export default useGetMaterialInitialValues
