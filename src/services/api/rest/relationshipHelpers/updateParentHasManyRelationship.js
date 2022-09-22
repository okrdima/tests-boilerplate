import { getDocument, updateDocument } from 'services/api/rest'

/**
 * It updates a parent document's hasMany relationship with a child document
 * @param parentId - the id of the parent document
 * @param parentCollection - the collection of the parent document
 * @param fieldName - the name of the field in the parent document that contains the children
 * @param childrenId - the id of the child document
 * @param [isRemove=false] - boolean - whether to remove the child from the parent's relationship or
 * add it
 * @returns A function that takes in 5 parameters and returns nothing.
 */
const updateParentHasManyRelationship = async (
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
  const children = parent[fieldName] || []
  const newChildren = isRemove
    ? children.filter((_id) => _id !== childId)
    : [...children, childId]
  // update the parent document
  await updateDocument(parentCollection, parentId, { [fieldName]: newChildren })
}

export default updateParentHasManyRelationship
