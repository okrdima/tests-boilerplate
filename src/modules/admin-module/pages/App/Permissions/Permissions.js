import { PageWrapper } from '@qonsoll/react-design'
import { useTranslations } from 'contexts'
import { Tabs } from 'antd'
import { useStateWithStorage } from 'hooks'
import { Switch, useHistory } from 'react-router-dom'
import { useMemo } from 'react'

const Permissions = () => {
  // [ADDITIONAL_HOOKS]
  const [lastUsedTab, setLastActiveTab] = useStateWithStorage(
    null,
    `statistics-last-active-tab`
  )
  const { t } = useTranslations()
  const history = useHistory()

  // [HANDLERS]
  const onChangeTab = (key) => {
    setLastActiveTab(key)
    history.push(key)
  }

  // [COMPUTED_PROPERTIES]
  const { TabPane } = Tabs

  const tabsData = useMemo(() => [], [])

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
      <Switch></Switch>
    </PageWrapper>
  )
}

export default Permissions
