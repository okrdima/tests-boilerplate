import createDocument from './createDocument'
import updateDocument from './updateDocument'

/**
 * It saves a document to a collection, and returns the id of the saved document
 * @param collection - the name of the collection
 * @param data - the data that is being saved
 * @returns The id of the document that was created or updated.
 */
const saveBelongsToRelationship = async (collection, data) => {
  if (!data) return null
  // handling edit
  else if (data._id) {
    await updateDocument(collection, data._id, data)
    return data._id
  } else {
    const { id } = await createDocument(collection, data)
    return id
  }
}

export default saveBelongsToRelationship
