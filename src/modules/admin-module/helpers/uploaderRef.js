import { ref } from 'firebase/storage'
import { storage } from 'services/storage'

const uploaderRef = (file, path) => {
  const filePath = file.uid + '_' + file.name

  return ref(storage, `${path}/${filePath}`)
}

export default uploaderRef
