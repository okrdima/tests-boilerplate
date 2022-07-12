import { doc, serverTimestamp, setDoc } from 'firebase/firestore'

import { firestore } from '../firebase'
import { getId } from 'services/firestore'

const createDocument = async (collectionPath, documentData, id) => {
  const _id = id || getId(collectionPath)
  const ref = doc(firestore, collectionPath, _id)
  await setDoc(ref, { ...documentData, _id, _createdAt: serverTimestamp() })

  return { id: _id }
}

export default createDocument
