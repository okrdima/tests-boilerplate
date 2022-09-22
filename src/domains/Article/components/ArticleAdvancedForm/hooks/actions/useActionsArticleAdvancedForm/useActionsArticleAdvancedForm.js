import {
  updateDocument,
  createDocument,
  getId,
  saveHasManyRelationship
} from 'services/api/rest'

import { Article } from 'models'
import { message } from 'antd'
import { useHistory, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useTranslations } from 'contexts/Translation'

const useActionsArticleAdvancedForm = ({ initialData, form } = {}) => {
  // [COMPONENT_STATE_HOOKS]
  const [loading, setLoading] = useState(false)

  // [ADDITIONAL_HOOKS]
  const { t } = useTranslations()
  const history = useHistory()
  const params = useParams()

  const prepareValues = async (values = {}, additionalValues = {}) => {
    const articleId = initialData?.['article']?._id || getId('articles')
    const additionalReferences = { articleId }
    const preparedValues = {
      _id: articleId,
      ...additionalValues,
      name: values?.['article']?.['name'] ?? null,
      materials: await saveHasManyRelationship(
        'materials',
        values['materials'],
        additionalReferences
      )
    }
    return preparedValues
  }

  const saveForm = async (values, callback) => {
    try {
      // Prepare data to be saved
      const data = await prepareValues(values)
      // Save data
      if (initialData) {
        await updateDocument('articles', initialData.article?._id, data)
        message.success(t('Article successfully updated'))
      } else {
        await createDocument('articles', data, data._id)
        message.success(t('Article successfully created'))
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
        name: values?.['article']?.['name']
      }
      Article.validationSchema.validateSync(validationData)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
      throw new Error(t('Article validation error: ') + t(error.message))
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

export default useActionsArticleAdvancedForm
