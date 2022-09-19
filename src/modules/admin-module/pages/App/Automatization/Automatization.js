import { Switch, useHistory } from 'react-router-dom'

import { PageWrapper } from '@qonsoll/react-design'
import { Tabs } from 'antd'
import { useStateWithStorage } from 'hooks'
import { useTranslations } from 'contexts/Translation'

const Automatization = () => {
  // [ADDITIONAL_HOOKS]
  const [lastUsedTab, setLastActiveTab] = useStateWithStorage(
    null,
    `setting-last-active-tab`
  )
  const history = useHistory()
  const { t } = useTranslations()

  // [HANDLERS]
  const onChangeTab = (key) => {
    setLastActiveTab(key)
    history.push(key)
  }

  // [COMPUTED_PROPERTIES]
  const { TabPane } = Tabs
  const headingProps = {
    title: t('Automatization'),
    textAlign: 'left',
    marginBottom: 1
  }

  const tabsData = []

  return (
    <PageWrapper headingProps={headingProps}>
      <Tabs defaultActiveKey={lastUsedTab} onChange={onChangeTab}>
        {tabsData.map(({ title, key }) => (
          <TabPane tab={title} key={key} />
        ))}
      </Tabs>
      <Switch></Switch>
    </PageWrapper>
  )
}

export default Automatization
