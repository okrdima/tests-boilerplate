import { Box, Col, Divider, Menu, MenuItem, Row } from '@qonsoll/react-design'
import { Fragment, useMemo } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import {
  AppstoreOutlined,
  BarChartOutlined,
  SettingFilled
} from '@ant-design/icons'
import { LanguageSelect } from 'domains/Translation/components'
import { useTranslations } from 'contexts/Translation'
import ADMIN_MODULE_MENU_ITEMS from 'modules/admin-module/components/menuItems'

const MainMenu = () => {
  // [ADDITIONAL_HOOKS]
  const { t } = useTranslations()
  const history = useHistory()
  const location = useLocation()

  // [COMPUTED PROPERTIES]
  const initialSelected = useMemo(() => {
    const currentParentPath = location.pathname.split('/')?.[1]
    return ['/' + currentParentPath]
  }, [location])
  const menuItems = useMemo(
    () => [
      // {
      //   key: '/translations',
      //   icon: <Icon name="TranslationFilled" />,
      //   text: t('Translations'),
      //   onClick: () => history.push('/translations'),
      //   divided: true
      // },
      {
        key: '/dashboard',
        icon: <AppstoreOutlined />,
        text: t('Dashboard'),
        onClick: () => history.push('/dashboard')
      },
      {
        key: '/settings',
        icon: <SettingFilled />,
        text: t('Settings'),
        onClick: () => history.push('/settings')
      },
      {
        key: '/statistics',
        icon: <BarChartOutlined />,
        text: t('Statistics'),
        onClick: () => history.push('/statistics'),
        divided: ADMIN_MODULE_MENU_ITEMS.menuItemsExist // if there any menuItems in the module
      },
      ...ADMIN_MODULE_MENU_ITEMS.getMenuItems({ t, history })
    ],
    [t, history]
  )

  return (
    <Fragment>
      <Row mb={16}>
        <Col>
          <LanguageSelect />
        </Col>
      </Row>
      <Menu mode="inline" defaultSelectedKeys={initialSelected}>
        {menuItems.map((item) => (
          <Fragment key={item.key}>
            <MenuItem key={item.key} onClick={item.onClick} icon={item.icon}>
              {item.text}
            </MenuItem>
            {item.divided && (
              <Box my={3}>
                <Divider />
              </Box>
            )}
          </Fragment>
        ))}
      </Menu>
    </Fragment>
  )
}

export default MainMenu
