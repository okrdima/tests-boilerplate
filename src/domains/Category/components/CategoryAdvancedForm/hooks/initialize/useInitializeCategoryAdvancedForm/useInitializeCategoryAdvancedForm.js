import { useEffect } from 'react'
import { Form } from 'antd'

const useInitializeCategoryAdvancedForm = (initialData) => {
  // [ADDITIONAL_HOOKS]
  const [form] = Form.useForm()

  // [LIFECYCLE]
  useEffect(() => {
    if (initialData) {
      const { category } = initialData
      const formValues = {
        category: {
          name: category['name'] ?? null
        }
      }
      form.setFieldsValue(formValues)
    }
  }, [initialData, form])

  return { form }
}

export default useInitializeCategoryAdvancedForm
