import { REST_METHODS } from 'services/api/rest'
import fetchApi from '../fetchApi'

/**
 * It deletes a document from a collection in Firestore
 * @param collectionPath - The path to the collection you want to delete a document from.
 * @param id - The id of the document you want to delete.
 * @returns The result of the deleteDoc function.
 */
const updateDocument = async (collectionPath, _id, data) => {
  const path = _id ? `${collectionPath}/${_id}` : collectionPath
  const body = { data, _id }
  const method = REST_METHODS.PUT

  const response = await fetchApi({ path, method, body })
  if (response.statusCode === 200) return response.data
  throw new Error('Error updating document')
}

export default updateDocument
