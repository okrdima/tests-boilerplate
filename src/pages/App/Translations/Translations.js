import { useMemo, useState } from 'react'

import { CURRENT_APP } from 'domains/Translation/__constants__'
import { CustomTabs } from './Translations.styles'
import { LocalizationForm } from '../../../domains/Translation/components'
import { PageWrapper } from '@qonsoll/react-design'
import { Tabs } from 'antd'
import { useHistory } from 'react-router-dom'
import { useTranslations } from '../../../contexts/Translation'

const { TabPane } = Tabs

const Translations = () => {
  // [ADDITIONAL HOOKS]
  const { t } = useTranslations()
  const history = useHistory()

  // [COMPONENT STATE HOOKS]
  const [isPageLoading, setIsPageLoading] = useState(true)

  // [HELPER FUNCTIONS]
  const handleLoadingChange = (newValue = false) => {
    if (isPageLoading !== newValue) setIsPageLoading(newValue)
  }

  // [COMPUTED PROPERTIES]
  const height = useMemo(
    () => (isPageLoading ? '100%' : 'initial'),
    [isPageLoading]
  )

  return (
    <PageWrapper
      height="100%"
      headingProps={{
        title: t('Translations'),
        textAlign: 'left'
      }}
      onBack={() => history?.goBack()}
    >
      <CustomTabs defaultActiveKey={CURRENT_APP} size="large" height={height}>
        <TabPane tab={CURRENT_APP} key={CURRENT_APP}>
          <LocalizationForm
            appName={CURRENT_APP}
            isPageLoading={isPageLoading}
            handleLoadingChange={handleLoadingChange}
          />
        </TabPane>
      </CustomTabs>
    </PageWrapper>
  )
}

export default Translations
