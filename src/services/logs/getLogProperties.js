import { LOG_TYPES } from '__constants__'
import firebase from 'firebase/compat/app'
import { compareObjects } from 'helpers'

const PROPERTIES_MAP = {
  [LOG_TYPES.CREATE]: async (props) => {
    const { collectionPath, documentData } = props
    const _createdBy = await firebase.auth().currentUser.uid
    const _createdAt = firebase.firestore.FieldValue.serverTimestamp()
    return {
      documentData,
      collectionPath,
      _createdBy,
      _createdAt
    }
  },
  [LOG_TYPES.UPDATE]: async (props) => {
    const { collectionPath, documentData } = props
    const { _id } = documentData

    const _updatedBy = await firebase.auth().currentUser.uid
    const _updatedAt = firebase.firestore.FieldValue.serverTimestamp()
    const prevDocumentSnapshot = await firebase
      .firestore()
      .collection(collectionPath)
      .doc(_id)
      .get()

    const prevDocumentData = prevDocumentSnapshot.data()

    const difference = compareObjects(prevDocumentData, documentData)

    return {
      _updatedAt,
      _updatedBy,
      documentData,
      difference
    }
  },
  [LOG_TYPES.DELETE]: async (props) => {
    const { documentData, collectionPath } = props
    const { _id } = documentData

    const _deletedBy = await firebase.auth().currentUser.uid
    const _deletedAt = firebase.firestore.FieldValue.serverTimestamp()

    return {
      _deletedAt,
      _deletedBy,
      documentData: { _id, collectionPath }
    }
  }
}

const getLogProperties = async (logType, props) =>
  PROPERTIES_MAP[logType](props)

export default getLogProperties
