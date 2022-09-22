import { COLLECTIONS } from '__constants__'
import firebase from 'firebase/compat/app'
import { getId } from 'services/api/firebase'
import { getLogProperties } from './'

const createLog = async (type, collectionPath, data) => {
  const properties = await getLogProperties(type, {
    collectionPath,
    documentData: data
  })
  const _id = getId(COLLECTIONS.LOGS)

  firebase
    .firestore()
    .collection(COLLECTIONS.LOGS)
    .doc(_id)
    .set({
      ...properties,
      type,
      _id
    })
}

export default createLog
