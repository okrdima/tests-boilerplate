import { getDocument, updateDocument } from 'services/firestore'

/**
 * It updates a parent document's hasOne relationship with a child document
 * @param parentId - the id of the parent document
 * @param parentCollection - the collection of the parent document
 * @param fieldName - the name of the field on the parent document that references the child document
 * @param childId - the id of the child document
 * @param [isRemove=false] - boolean - whether or not to remove the relationship
 * @returns A function that takes in 5 parameters and returns nothing.
 */
const updateParentHasOneRelationship = async (
  parentId,
  parentCollection,
  fieldName,
  childId,
  isRemove = false
) => {
  if (!parentId || !parentCollection || !fieldName || !childId) return
  // get the parent document
  const parent = await getDocument(parentCollection, parentId)
  if (!parent) return
  // update the parent document
  await updateDocument(parentCollection, parentId, {
    [fieldName]: isRemove ? null : childId
  })
}

export default updateParentHasOneRelationship
