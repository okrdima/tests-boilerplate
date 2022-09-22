import { useEffect } from 'react'
import { Form } from 'antd'

const useInitializeMaterialAdvancedForm = (initialData) => {
  // [ADDITIONAL_HOOKS]
  const [form] = Form.useForm()

  // [LIFECYCLE]
  useEffect(() => {
    if (initialData) {
      const { material, keywords, category, type } = initialData
      const formValues = {
        material: {
          url: material['url'] ?? null
        },
        keywords: keywords ?? null,
        category: category ?? null,
        type: type ?? null
      }
      form.setFieldsValue(formValues)
    }
  }, [initialData, form])

  return { form }
}

export default useInitializeMaterialAdvancedForm
