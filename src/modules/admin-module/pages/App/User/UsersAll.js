import { useFilter, useStateWithStorage } from 'hooks'

import { UserList } from 'modules/admin-module/domains/User/components'
import { PageWrapper } from '@qonsoll/react-design'
import { Spinner } from 'components'
import { useUsers } from 'modules/admin-module/domains/User/hooks'
import { useMemo } from 'react'
import { useTranslations } from 'contexts/Translation'

const UsersAll = () => {
  const { t } = useTranslations()
  const [listView] = useStateWithStorage(false, 'user-list-view')
  const { filterData } = useFilter('user-filter')

  const ref = useMemo(() => filterData, [filterData])

  const [users, loading] = useUsers(ref)

  return (
    <PageWrapper>
      {loading ? (
        <Spinner height="70vh" text={t('User loading')} />
      ) : (
        <UserList listView={listView} users={users} hideAddCard />
      )}
    </PageWrapper>
  )
}

export default UsersAll
