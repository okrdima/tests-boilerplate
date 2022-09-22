import { deleteObject } from 'firebase/storage'
import { ref } from 'firebase/storage'
import { storage } from 'services/firebase'

/**
 * It takes a path to a file in Firebase Storage, and returns a promise that resolves to true if the
 * file was successfully deleted, or false if it wasn't
 * @param path - The path to the file in the Firebase Storage bucket.
 * @returns A promise that resolves to the deleted object.
 */
const removeFile = (path) => {
  const storageRef = ref(storage, path)
  return deleteObject(storageRef)
}

export default removeFile
