import { useEffect } from 'react'
import { Form } from 'antd'

const useInitializeArticleAdvancedForm = (initialData) => {
  // [ADDITIONAL_HOOKS]
  const [form] = Form.useForm()

  // [LIFECYCLE]
  useEffect(() => {
    if (initialData) {
      const { article, materials } = initialData
      const formValues = {
        article: {
          name: article['name'] ?? null
        },
        materials: materials ?? null
      }
      form.setFieldsValue(formValues)
    }
  }, [initialData, form])

  return { form }
}

export default useInitializeArticleAdvancedForm
