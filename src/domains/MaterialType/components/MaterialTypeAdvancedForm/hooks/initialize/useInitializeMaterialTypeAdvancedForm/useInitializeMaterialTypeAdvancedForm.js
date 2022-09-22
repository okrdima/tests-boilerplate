import { useEffect } from 'react'
import { Form } from 'antd'

const useInitializeMaterialTypeAdvancedForm = (initialData) => {
  // [ADDITIONAL_HOOKS]
  const [form] = Form.useForm()

  // [LIFECYCLE]
  useEffect(() => {
    if (initialData) {
      const { materialType } = initialData
      const formValues = {
        materialType: {
          name: materialType['name'] ?? null
        }
      }
      form.setFieldsValue(formValues)
    }
  }, [initialData, form])

  return { form }
}

export default useInitializeMaterialTypeAdvancedForm
