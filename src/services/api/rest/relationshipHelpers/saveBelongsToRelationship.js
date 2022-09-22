import { createDocument, getDocument, updateDocument } from 'services/api/rest'

/**
 * If the data is not null, check if the document exists, if it does, update it, if it doesn't, create
 * it
 * @param collection - The collection name
 * @param data - The data that you want to save.
 * @returns The id of the document that was created or updated.
 */
const saveBelongsToRelationship = async (
  collection,
  data,
  additionalData = {}
) => {
  if (!data) return null
  // If the data is null, return null
  else {
    const isDocumentExists = await !!getDocument(collection, data._id)
    if (isDocumentExists) {
      await updateDocument(collection, data._id, { ...data, ...additionalData })
      return data._id
    } else {
      const { id } = await createDocument(collection, {
        ...data,
        ...additionalData
      })
      return id
    }
  }
}

export default saveBelongsToRelationship
