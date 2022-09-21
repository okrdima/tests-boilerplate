import _ from 'lodash'
import PropTypes from 'prop-types'

/**
 * It takes two arrays of objects and returns two arrays of ids
 * @param values - The values from the form
 * @param entityIds - The ids of the entity that you want to compare against.
 * @returns An array of two arrays.
 */
const differenceIds = (values, entityIds) => {
  const valuesIds = values?.map((item) => item?._id)

  const removedRoleIds = _.difference(entityIds, valuesIds)
  const createdRoleIds = _.difference(valuesIds, entityIds)

  return [removedRoleIds, createdRoleIds]
}
differenceIds.propTypes = {
  values: PropTypes.arrayOf(PropTypes.object),
  entityIds: PropTypes.arrayOf(PropTypes.string)
}

export default differenceIds
