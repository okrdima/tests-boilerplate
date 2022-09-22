import { useEffect } from 'react'
import { Form } from 'antd'

const useInitializeKeywordAdvancedForm = (initialData) => {
  // [ADDITIONAL_HOOKS]
  const [form] = Form.useForm()

  // [LIFECYCLE]
  useEffect(() => {
    if (initialData) {
      const { keyword } = initialData
      const formValues = {
        keyword: {
          name: keyword['name'] ?? null
        }
      }
      form.setFieldsValue(formValues)
    }
  }, [initialData, form])

  return { form }
}

export default useInitializeKeywordAdvancedForm
