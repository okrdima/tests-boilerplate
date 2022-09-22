import { getDownloadURL, uploadBytes } from 'firebase/storage'

import { ref } from 'firebase/storage'
import { storage } from 'services/firebase'

/**
 * It takes a file and a path, uploads the file to the path, and returns a promise that resolves to an
 * array containing the download URL and the snapshot
 * @param file - The file you want to upload.
 * @param path - The path to the file in the storage bucket.
 * @returns An array with the downloadUrl and the snapshot
 */
const uploadFile = async (file, path) => {
  const storageRef = ref(storage, path)

  const snapshot = await uploadBytes(storageRef, file)
  const downloadUrl = await getDownloadURL(snapshot.ref)

  return [downloadUrl, snapshot]
}

export default uploadFile
