import { REST_METHODS } from 'services/api/rest'
import fetchApi from '../fetchApi'

/**
 * It gets a document from a collection in Firestore
 * @param collectionPath - The path to the collection you want to get the document from.
 * @param _id - The id of the document you want to get.
 * @returns The data from the document
 */
const getDocument = async (collectionPath, _id) => {
  const method = REST_METHODS.GET
  const path = _id ? `${collectionPath}/${_id}` : collectionPath

  const response = await fetchApi({ path, method })
  if (response.statusCode === 200) return response.data
  throw new Error('Error fetching document')
}

export default getDocument
