import { collection, getDocs, query, where } from 'firebase/firestore'

import { firestore } from 'services/firebase'
import { updateDocument } from 'services/firestore'

const updateFieldInCollection = async ({
  collectionName,
  id,
  whereQuery,
  field,
  fieldValue = null
}) => {
  try {
    if (id?.length === 0) return

    const querySnapshot = query(
      collection(firestore, collectionName),
      where(...whereQuery)
    )
    const collectionSnapshot = await getDocs(querySnapshot)
    const collectionData = collectionSnapshot.docs.map((item) => item.data())

    collectionData.forEach((collectionData) => {
      updateDocument(collectionName, collectionData?._id, {
        ...collectionData,
        [field]: fieldValue
      })
    })
  } catch (error) {
    console.error(error)
  }
}

export default updateFieldInCollection
