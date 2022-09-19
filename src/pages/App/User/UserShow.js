import { PageWrapper } from '@qonsoll/react-design'
import { UserAdvancedView } from 'domains/User/components'
import { useTranslations } from 'contexts/Translation'

const UserShow = () => {
  const { t } = useTranslations()
  return (
    <PageWrapper
      headingProps={{
        title: t('User profile'),
        textAlign: 'left'
      }}>
      <UserAdvancedView />
    </PageWrapper>
  )
}

export default UserShow
