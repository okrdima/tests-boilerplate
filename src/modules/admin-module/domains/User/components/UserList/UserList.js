import PATHS from 'pages/paths'
import PropTypes from 'prop-types'
import { SettingsCombinedList } from 'modules/admin-module/domains/Settings/components'
import { UserAdvancedView } from 'modules/admin-module/domains/User/components'
import { useHistory } from 'react-router-dom'

const UserList = (props) => {
  const { users, actions, listView, hideAddCard, isEditable } = props

  const history = useHistory()

  const navigateToUserCreate = () =>
    history.push(PATHS.AUTHENTICATED.USER_CREATE)

  return (
    <SettingsCombinedList
      responsiveColWidthArr={[4, 4, 4, 4, 3]}
      hideAddCard={hideAddCard}
      onClickAction={navigateToUserCreate}
      listView={listView}
      items={users}>
      <UserAdvancedView actions={actions} isEditable={isEditable} />
    </SettingsCombinedList>
  )
}

UserList.propTypes = {
  users: PropTypes.array,
  hideAddCard: PropTypes.any,
  listView: PropTypes.bool,
  isEditable: PropTypes.bool,
  actions: PropTypes.shape({
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onDoubleClick: PropTypes.func,
    onClick: PropTypes.func
  })
}

export default UserList
