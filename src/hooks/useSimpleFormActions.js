import { deleteDocument, updateDocument } from 'services/api/rest'

import { message } from 'antd'
import { useEvent } from 'hooks'
import { useMemo } from 'react'
import { useTranslations } from 'contexts/Translation'

/**
 * It returns an object with four functions that are used to handle the actions of the form
 * @param props - The props passed to the component
 * @returns An object with the following properties:
 *   handleCancel: A function that resets the form and changes the state to false
 *   handleEdit: A function that changes the state to true
 *   handleSave: A function that updates the document and resets the form
 *   handleDelete: A function that deletes the document
 */
const useSimpleFormActions = (props) => {
  const { form, changeStateAction, document, collectionName } = props

  const { t } = useTranslations()
  const handleCancel = useEvent(() => {
    changeStateAction(false)
    form.resetFields()
  })
  const handleEdit = useEvent(() => changeStateAction(true))
  const handleSave = useEvent(async () => {
    try {
      await updateDocument(collectionName, document._id, form.getFieldsValue())
      changeStateAction(false)
      form.resetFields()
      message.success(t('Document successfully updated'))
    } catch (error) {
      message.error(error.message)
    }
  })
  const handleDelete = useEvent(async () => {
    try {
      await deleteDocument(collectionName, document._id)
      message.success(t('Document successfully deleted'))
    } catch (error) {
      message.error(error.message)
    }
  })

  return useMemo(
    () => ({ handleCancel, handleEdit, handleSave, handleDelete }),
    [handleCancel, handleDelete, handleEdit, handleSave]
  )
}

export default useSimpleFormActions
