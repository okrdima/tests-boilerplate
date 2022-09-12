import { doc, serverTimestamp, setDoc } from 'firebase/firestore'

import { firestore } from '../firebase'
import { getId } from 'services/firestore'
import { createLog } from 'services/logs'
import { LOG_TYPES } from '__constants__'

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

  createLog(LOG_TYPES.CREATE, collectionPath, data)

  await setDoc(ref, data)

  return { id: _id }
}

export default createDocument
