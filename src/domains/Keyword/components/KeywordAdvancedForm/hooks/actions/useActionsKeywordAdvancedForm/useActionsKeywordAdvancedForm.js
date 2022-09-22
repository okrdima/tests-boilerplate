import {
  updateDocument,
  createDocument,
  getId,
  updateParentHasManyRelationship
} from 'services/api/rest'

import { Keyword } from 'models'
import { message } from 'antd'
import { useHistory, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useTranslations } from 'contexts/Translation'

const useActionsKeywordAdvancedForm = ({ initialData, form } = {}) => {
  // [COMPONENT_STATE_HOOKS]
  const [loading, setLoading] = useState(false)

  // [ADDITIONAL_HOOKS]
  const { t } = useTranslations()
  const history = useHistory()
  const params = useParams()

  const prepareValues = async (values = {}, additionalValues = {}) => {
    const keywordId = initialData?.['keyword']?._id || getId('keywords')
    const preparedValues = {
      _id: keywordId,
      ...additionalValues,
      name: values?.['keyword']?.['name'] ?? null
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
        await updateParentHasManyRelationship(
          params.materialId,
          'materials',
          'keywords',
          data._id
        )
      // Save data
      if (initialData) {
        await updateDocument('keywords', initialData.keyword?._id, data)
        message.success(t('Keyword successfully updated'))
      } else {
        await createDocument('keywords', data, data._id)
        message.success(t('Keyword successfully created'))
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
        name: values?.['keyword']?.['name']
      }
      Keyword.validationSchema.validateSync(validationData)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
      throw new Error(t('Keyword validation error: ') + t(error.message))
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

export default useActionsKeywordAdvancedForm
