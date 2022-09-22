import { REST_METHODS } from 'services/api/rest'
import fetchApi from '../fetchApi'
import { getId } from 'services/api/firebase'

/**
 * It creates a document in a collection with a given ID
 * @param collectionPath - The path to the collection you want to create a document in.
 * @param data - The data you want to store in the document.
 * @param id - The id of the document to create. If not provided, a random id will be generated.
 * @returns The id of the document that was created.
 */
const createDocument = async (collectionPath, data, id) => {
  const _id = id || getId(collectionPath)
  const method = REST_METHODS.POST
  const path = `${collectionPath}`
  const body = { data, _id }

  const response = await fetchApi({ path, method, body })
  if (response.statusCode === 200) return response.data
  throw new Error('Error creating document')
}

export default createDocument
