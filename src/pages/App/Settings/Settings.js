import { Redirect, Route, Switch, useHistory } from 'react-router-dom'

import { HeaderBreadcrumbs } from 'components'
import PATHS from 'pages/paths'
import { PageWrapper } from '@qonsoll/react-design'
// import { SETTINGS_ROUTES } from 'pages/App/routes'
import { Tabs } from 'antd'
import { useStateWithStorage } from 'hooks'
import { useTranslations } from 'contexts/Translation'

const Settings = () => {
  // [ADDITIONAL_HOOKS]
  const [lastUsedTab, setLastActiveTab] = useStateWithStorage(
    null,
    `setting-last-active-tab`
  )
  const history = useHistory()
  const { t } = useTranslations()

  // [HANDLERS]
  const handleBackButtonClick = () => history.goBack()
  const onChangeTab = (key) => {
    setLastActiveTab(key)
    history.push(key)
  }

  // [COMPUTED_PROPERTIES]
  const { TabPane } = Tabs
  const headingProps = {
    title: t('Settings'),
    textAlign: 'left',
    marginBottom: 1
  }

  const tabsData = []

  return (
    <PageWrapper
      headingProps={headingProps}
      breadcrumbs={<HeaderBreadcrumbs />}
      onBack={handleBackButtonClick}
    >
      <Tabs defaultActiveKey={lastUsedTab} onChange={onChangeTab}>
        {tabsData.map(({ title, key }) => (
          <TabPane tab={title} key={key} />
        ))}
      </Tabs>
      <Switch></Switch>
    </PageWrapper>
  )
}

export default Settings
