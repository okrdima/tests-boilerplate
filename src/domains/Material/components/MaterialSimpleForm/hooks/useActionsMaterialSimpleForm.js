import { updateDocument, createDocument, getId } from 'services/api/rest'
import { Material } from 'models'
import { message } from 'antd'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import { useTranslations } from 'contexts/Translation'

const useActionsMaterialSimpleForm = ({ initialData, form } = {}) => {
  // [COMPONENT_STATE_HOOKS]
  const [loading, setLoading] = useState(false)

  // [ADDITIONAL_HOOKS]
  const { t } = useTranslations()
  const history = useHistory()

  const prepareValues = async (values, additionalValues) => {
    const materialId = initialData?._id || getId('materials')
    const preparedValues = {
      _id: materialId,
      ...additionalValues,
      url: values?.['url'] ?? null
    }
    return preparedValues
  }

  const saveForm = async (values, callback) => {
    try {
      // Prepare data to be saved
      const data = await prepareValues(values)
      // Save data
      if (initialData) {
        await updateDocument('materials', initialData.material?._id, data)
        message.success(t('Material successfully updated'))
      } else {
        await createDocument('materials', data, data._id)
        message.success(t('Material successfully created'))
      }
      // Final callback
      callback?.()
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
      throw new Error(t('Something went wrong during data save'))
    }
  }

  const validateForm = (values) => {
    try {
      // Prepare data to be validated
      const validationData = {
        url: values['url']
      }
      Material.validationSchema.validateSync(validationData)
    } catch (error) {
      throw new Error(t('Validation error: ') + error.message)
    }
  }

  const onFinish = async () => {
    if (loading) return // Avoid multiple calls

    try {
      setLoading(true)
      // Get form values
      const formValues = form.getFieldsValue()
      // Validate fields
      validateForm(formValues)
      // Final callback
      const callback = () => history.goBack()
      // Save data
      await saveForm(formValues, callback)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
      setLoading(false)
      message.error(error.message)
    }
  }

  const onReset = () => {
    form.resetFields()
  }

  return { onFinish, onReset, loading, saveForm, validateForm, prepareValues }
}

export default useActionsMaterialSimpleForm
