import {
  updateDocument,
  createDocument,
  getId,
  saveHasManyRelationship,
  saveBelongsToRelationship,
  saveHasOneRelationship
} from 'services/api/rest'
import useActionsMaterialTypeSimpleForm from 'domains/MaterialType/components/MaterialTypeSimpleForm/hooks/useActionsMaterialTypeSimpleForm'

import { Material } from 'models'
import { message } from 'antd'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import { useTranslations } from 'contexts/Translation'

const useActionsMaterialAdvancedForm = ({ initialData, form } = {}) => {
  // [COMPONENT_STATE_HOOKS]
  const [loading, setLoading] = useState(false)

  // [ADDITIONAL_HOOKS]
  const { t } = useTranslations()
  const history = useHistory()
  const {
    prepareValues: prepareMaterialTypeValues,
    validateForm: validateMaterialTypeForm
  } = useActionsMaterialTypeSimpleForm({ initialData: initialData?.type })

  const prepareValues = async (values = {}, additionalValues = {}) => {
    const materialId = initialData?.['material']?._id || getId('materials')
    const additionalReferences = { materialId }
    const preparedValues = {
      _id: materialId,
      ...additionalValues,
      url: values?.['material']?.['url'] ?? null,
      keywords: await saveHasManyRelationship(
        'keywords',
        values['keywords'],
        additionalReferences
      ),
      category: await saveHasOneRelationship(
        'categories',
        values['category'],
        additionalReferences
      ),
      type: await saveBelongsToRelationship(
        'materialTypes',
        await prepareMaterialTypeValues(values['type']),
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
        url: values?.['material']?.['url']
      }
      Material.validationSchema.validateSync(validationData)
      validateMaterialTypeForm(values['type'])
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
      throw new Error(t('Material validation error: ') + t(error.message))
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

export default useActionsMaterialAdvancedForm
