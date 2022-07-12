import { doc, updateDoc } from 'firebase/firestore'

import { firestore } from '../firebase'

const updateDocument = (collectionPath, id, data) => {
  const ref = doc(firestore, collectionPath, id)
  return updateDoc(ref, data)
}

export default updateDocument
