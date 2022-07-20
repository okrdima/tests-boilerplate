import { COLLECTIONS } from '__constants__'
import firebase from 'firebase/compat/app'

const { USERS } = COLLECTIONS

/**
 * Save the user's data to the database.
 * @returns A promise that resolves to the user object.
 */
const saveUserToDB = ({
  id,
  email,
  avatarUrl,
  agreement,
  gdpr,
  additionalData,
  onError
}) => {
  const firestore = firebase.firestore()
  return firestore
    .collection(USERS)
    .doc(id)
    .set({
      _createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      _updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      _isUpdated: false,
      _updatedBy: id,
      _id: id,
      email,
      emailVerified: false,
      ...additionalData,
      agreement,
      gdpr,
      avatarUrl
      // role
    })
    .catch((err) => {
      onError && onError(err)
    })
}

export default saveUserToDB
