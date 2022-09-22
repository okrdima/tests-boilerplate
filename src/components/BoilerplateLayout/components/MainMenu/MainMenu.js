import { Box, Col, Divider, Menu, MenuItem, Row } from '@qonsoll/react-design'
import { Fragment, useMemo } from 'react'

import {
  AppstoreOutlined,
  StarOutlined,
  SettingFilled,
  BarChartOutlined
} from '@ant-design/icons'
import { Icon } from '@qonsoll/icons'
import { LanguageSelect } from 'domains/Translation/components'
import { useHistory, useLocation } from 'react-router-dom'
import { useTranslations } from 'contexts/Translation'

const MainMenu = () => {
  // [ADDITIONAL_HOOKS]
  const { t } = useTranslations()
  const history = useHistory()
  const location = useLocation()

  // [COMPUTED_PROPERTIES]
  const initialSelected = useMemo(() => {
    const currentParentPath = location.pathname.split('/')?.[1]
    return ['/' + currentParentPath]
  }, [location])

  const menuItems = useMemo(
    () => [
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
        onClick: () => history.push('/statistics')
      },
      {
        key: '/materials',
        icon: <StarOutlined />,
        text: t('Materials'),
        onClick: () => history.push('/materials')
      },
      {
        key: '/keywords',
        icon: <StarOutlined />,
        text: t('Keywords'),
        onClick: () => history.push('/keywords')
      },
      {
        key: '/categories',
        icon: <StarOutlined />,
        text: t('Categories'),
        onClick: () => history.push('/categories')
      },
      {
        key: '/articles',
        icon: <StarOutlined />,
        text: t('Articles'),
        onClick: () => history.push('/articles')
      }
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
