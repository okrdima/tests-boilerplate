import { getDownloadURL, uploadString } from 'firebase/storage'

import { getBase64 } from 'helpers'
import storageRef from 'services/storage/storageRef'

const uploadImageBase64 = async (image, storagePath) => {
  const ref = storageRef(storagePath)
  const uploadedFile = await uploadString(ref, image, 'data_url')
  return getDownloadURL(uploadedFile?.ref)
}

export default uploadImageBase64
