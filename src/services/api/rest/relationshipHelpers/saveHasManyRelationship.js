import { createDocument, getDocument } from 'services/api/rest'

/**
 * It takes a collection and an array of objects, and returns an array of ids of the objects that were
 * created or already existed in the collection
 * @param collection - The collection you want to save the data to.
 * @param array - The array of objects that you want to save.
 * @returns An array of promises.
 */
const saveHasManyRelationship = async (
  collection,
  array,
  additionalData = {}
) => {
  const promises = array?.map(async (item) => {
    const isDocumentExists = await !!getDocument(collection, item._id)
    if (!isDocumentExists) {
      const document = await createDocument(collection, {
        ...item,
        ...additionalData
      })
      return document.id
    }
    return item._id
  })
  return promises?.length ? Promise.all(promises) : null
}

export default saveHasManyRelationship
