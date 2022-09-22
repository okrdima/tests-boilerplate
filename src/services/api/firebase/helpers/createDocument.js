import { doc, serverTimestamp, setDoc } from 'firebase/firestore'

import { LOG_TYPES } from '__constants__'
import { createLog } from 'services/logs'
import { firestore } from 'services/firebase'
import { getId } from 'services/api/firebase'

/**
 * It creates a document in a collection with a given ID
 * @param collectionPath - The path to the collection you want to create a document in.
 * @param documentData - The data you want to store in the document.
 * @param id - The id of the document to create. If not provided, a random id will be generated.
 * @returns The id of the document that was created.
 */
const createDocument = async (collectionPath, documentData, id) => {
  const _id = id || getId(collectionPath)
  const ref = doc(firestore, collectionPath, _id)
  const data = { ...documentData, _id, _createdAt: serverTimestamp() }

  const result = await setDoc(ref, data)
  createLog(LOG_TYPES.CREATE, collectionPath, data)

  return result
}

export default createDocument
