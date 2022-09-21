import { PageWrapper } from '@qonsoll/react-design'
import { useTranslations } from 'contexts'
import { Tabs } from 'antd'
import { useStateWithStorage } from 'hooks'
import { Switch, Route, useHistory } from 'react-router-dom'
import { useMemo } from 'react'
import PATHS from 'pages/paths'
import { PERMISSIONS_ROUTES } from '../routes'

const Permissions = () => {
  const [lastUsedTab, setLastActiveTab] = useStateWithStorage(
    null,
    `permissions-last-active-tab`
  )
  const { t } = useTranslations()
  const history = useHistory()

  const onChangeTab = (key) => {
    setLastActiveTab(key)
    history.push(key)
  }

  const { TabPane } = Tabs

  const tabsData = useMemo(
    () => [
      {
        title: t('Users'),
        key: PATHS.AUTHENTICATED.USERS_LIST
      },
      {
        title: t('Roles'),
        key: PATHS.AUTHENTICATED.ROLES_LIST
      },
      {
        title: t('Models'),
        key: PATHS.AUTHENTICATED.MODELS_LIST
      },
      {
        title: t('Pages'),
        key: PATHS.AUTHENTICATED.PAGES_LIST
      }
    ],
    [t]
  )

  return (
    <PageWrapper
      headingProps={{
        title: t('Permissions'),
        textAlign: 'left'
      }}>
      <Tabs defaultActiveKey={lastUsedTab} onChange={onChangeTab}>
        {tabsData.map(({ title, key }) => (
          <TabPane tab={title} key={key} />
        ))}
      </Tabs>
      <Switch>
        {PERMISSIONS_ROUTES.map((routeProps) => (
          <Route key={routeProps.key} {...routeProps} />
        ))}
      </Switch>
    </PageWrapper>
  )
}

export default Permissions
