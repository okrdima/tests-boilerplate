import { REST_METHODS } from 'services/api/rest'
import fetchApi from '../fetchApi'

/**
 * It deletes a document from a collection in Firestore
 * @param collectionPath - The path to the collection you want to delete a document from.
 * @param id - The id of the document you want to delete.
 * @returns The result of the deleteDoc function.
 */
const deleteDocument = async (collectionPath, _id) => {
  const path = _id ? `${collectionPath}/${_id}` : collectionPath
  const method = REST_METHODS.DELETE

  const response = await fetchApi({ path, method })
  if (response.statusCode === 200) return response.data
  throw new Error('Error deleting document')
}

export default deleteDocument
