import { useMemo } from 'react'
import { useLoading } from 'hooks'
import { useDocument } from 'services/api/rest'

const useGetMaterialTypeInitialValues = (id) => {
  // [DATA_FETCH]
  const [materialType, materialTypeLoading] = useDocument({
    ref: id ? `materialTypes/${id}` : null
  })

  // [COMPUTED_PROPERTIES]
  const initialValues = useMemo(
    () => ({
      materialType
    }),
    [materialType]
  )
  const loadings = useMemo(
    () => (id ? [!materialType, materialTypeLoading] : []),
    [id, materialType, materialTypeLoading]
  )

  // [ADDITIONAL_HOOKS]
  const loading = useLoading(loadings)

  return [initialValues, loading]
}

export default useGetMaterialTypeInitialValues
