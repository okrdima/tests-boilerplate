import { PageWrapper } from '@qonsoll/react-design'
import { useTranslations } from 'contexts'

const Dashboard = () => {
  const { t } = useTranslations()

  return (
    <PageWrapper
      headingProps={{
        title: t('Dashboard'),
        textAlign: 'left'
      }}
    >
      Content
    </PageWrapper>
  )
}

export default Dashboard
