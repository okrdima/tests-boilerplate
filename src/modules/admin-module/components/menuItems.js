import { Icon } from '@qonsoll/icons'

// TODO to rename function/file, move to another place if necessary
const getMenuItems = ({ t, history }) => [
  {
    key: '/translations',
    icon: <Icon name="TranslationFilled" size={16} />,
    text: t('Translations'),
    onClick: () => history.push('/translations'),
    divided: true
  },
  {
    key: '/automatization',
    icon: <Icon name="Rocket2Outlined" size={16} />,
    text: t('Automatization'),
    onClick: () => history.push('/automatization')
  },
  {
    key: '/permissions',
    icon: <Icon name="ShieldPlusOutlined" size={16} />,
    text: t('Permissions'),
    onClick: () => history.push('/permissions'),
    divided: true
  }
]

const menuItems = {
  menuItemsExist: true,
  getMenuItems
}

export default menuItems
