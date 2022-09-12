import { doc, updateDoc } from 'firebase/firestore'
import { createLog } from 'services/logs'
import { LOG_TYPES } from '__constants__'

import { firestore } from '../firebase'

/**
 * It updates a document in a collection
 * @param collectionPath - The path to the collection you want to update.
 * @param id - The id of the document you want to update.
 * @param data - The data to be updated.
 * @returns A promise that resolves to the data that was updated.
 */
const updateDocument = async (collectionPath, id, data) => {
  const ref = doc(firestore, collectionPath, id)
  await createLog(LOG_TYPES.UPDATE, collectionPath, { ...data, _id: id })
  return updateDoc(ref, data)
}

export default updateDocument
