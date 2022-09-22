import {
  updateDocument,
  createDocument,
  getId,
  updateParentHasOneRelationship
} from 'services/api/rest'

import { Category } from 'models'
import { message } from 'antd'
import { useHistory, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useTranslations } from 'contexts/Translation'

const useActionsCategoryAdvancedForm = ({ initialData, form } = {}) => {
  // [COMPONENT_STATE_HOOKS]
  const [loading, setLoading] = useState(false)

  // [ADDITIONAL_HOOKS]
  const { t } = useTranslations()
  const history = useHistory()
  const params = useParams()

  const prepareValues = async (values = {}, additionalValues = {}) => {
    const categoryId = initialData?.['category']?._id || getId('categories')
    const preparedValues = {
      _id: categoryId,
      ...additionalValues,
      name: values?.['category']?.['name'] ?? null
    }
    if (params.materialId) preparedValues['materialId'] = params.materialId
    return preparedValues
  }

  const saveForm = async (values, callback) => {
    try {
      // Prepare data to be saved
      const data = await prepareValues(values)
      // Updating parent references
      if (params.materialId)
        await updateParentHasOneRelationship(
          params.materialId,
          'materials',
          'category',
          data._id
        )
      // Save data
      if (initialData) {
        await updateDocument('categories', initialData.category?._id, data)
        message.success(t('Category successfully updated'))
      } else {
        await createDocument('categories', data, data._id)
        message.success(t('Category successfully created'))
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
        name: values?.['category']?.['name']
      }
      Category.validationSchema.validateSync(validationData)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
      throw new Error(t('Category validation error: ') + t(error.message))
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
      setLoading(false)
      message.error(error.message)
    }
  }

  const onReset = () => {
    form.resetFields()
    history.goBack()
  }

  return { onFinish, onReset, loading, saveForm, validateForm, prepareValues }
}

export default useActionsCategoryAdvancedForm
