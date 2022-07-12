import { getStorage } from 'firebase/storage'
import app from '../firebase/app'

const storage = getStorage(app)

export default storage
