import { doc, updateDoc } from 'firebase/firestore'

import { LOG_TYPES } from '__constants__'
import { createLog } from 'services/logs'
import { firestore } from 'services/firebase'

/**
 * It updates a document in a collection
 * @param collectionPath - The path to the collection you want to update.
 * @param id - The id of the document you want to update.
 * @param data - The data to be updated.
 * @returns A promise that resolves to the data that was updated.
 */
const updateDocument = async (collectionPath, id, data) => {
  const ref = doc(firestore, collectionPath, id)

  const result = await updateDoc(ref, data)
  createLog(LOG_TYPES.UPDATE, collectionPath, { ...data, _id: id })

  return result
}

export default updateDocument
