import { Box, Col, Divider, Menu, MenuItem, Row } from '@qonsoll/react-design'
import { Fragment, useMemo } from 'react'

import { AppstoreOutlined } from '@ant-design/icons'
import { Icon } from '@qonsoll/icons'
import { LanguageSelect } from 'domains/Translation/components'
import { useHistory } from 'react-router-dom'
import { useTranslations } from 'contexts/Translation'

const MainMenu = () => {
  // [ADDITIONAL HOOKS]
  const { t } = useTranslations()
  const history = useHistory()

  // [COMPUTED PROPERTIES]
  const menuItems = useMemo(
    () => [
      {
        key: 'TRANSLATIONS',
        icon: <Icon name="TranslationFilled" />,
        text: t('Translations'),
        onClick: () => history.push('/translations'),
        divided: true
      },
      {
        key: 'DASHBOARD',
        icon: <AppstoreOutlined />,
        text: t('Dashboard'),
        onClick: () => history.push('/dashboard')
      }
    ],
    [t, history]
  )

  return (
    <>
      <Row mb={16}>
        <Col>
          <LanguageSelect />
        </Col>
      </Row>
      <Menu mode="inline">
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
    </>
  )
}

export default MainMenu
