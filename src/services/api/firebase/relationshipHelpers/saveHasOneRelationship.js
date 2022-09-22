import { createDocument, getDocument } from 'services/api/firebase'

/**
 * If the data is null, return null. If the data has an _id, return the _id. Otherwise, create a new
 * document and return the id
 * @param collection - the name of the collection you want to save the data to
 * @param data - the data that is being saved
 * @returns The id of the document that was created or the id of the document that was already there.
 */
const saveHasOneRelationship = async (
  collection,
  data,
  additionalData = {}
) => {
  if (!data) return null
  // handling edit
  else {
    const isDocumentExists = await !!getDocument(collection, data._id)
    if (isDocumentExists) return data._id
    else {
      const { id } = await createDocument(collection, {
        ...data,
        ...additionalData
      })
      return id
    }
  }
}

export default saveHasOneRelationship
