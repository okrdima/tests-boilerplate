import { COLLECTIONS } from '__constants__'
import useCollection from 'hooks/useCollection'

export default function useUsers(props) {
  const ref = COLLECTIONS.USERS

  const [value, loading, error, next, loadingMore, loadMoreAvailable] =
    useCollection({
      ref,
      ...props
    })

  return [value, loading, error, next, loadingMore, loadMoreAvailable]
}
