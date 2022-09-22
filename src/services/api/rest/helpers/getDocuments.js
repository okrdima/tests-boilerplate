import { REST_METHODS } from 'services/api/rest'
import fetchApi from '../fetchApi'

/**
 * It gets a document from a collection in Firestore
 * @param ref - The path to the collection you want to get the document from.
 * @param id - The id of the document you want to get.
 * @returns The data from the document
 */
const getDocuments = async (path) => {
  const method = REST_METHODS.GET

  const response = await fetchApi({ path, method })
  if (response.statusCode === 200) return response.data
  throw new Error('Error fetching documents')
}

export default getDocuments
