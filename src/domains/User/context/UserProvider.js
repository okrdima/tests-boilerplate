import 'firebase/compat/firestore'

import { useEffect, useMemo } from 'react'
import { useGDPRStatus, useSessionActions } from 'domains/Session/hooks'

import PropTypes from 'prop-types'
import UserContext from './UserContext'
import firebase from 'firebase/compat/app'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore'
import { useHandleError } from 'hooks'

const UserProvider = ({ children }) => {
  /* The above code is a function that takes in a callback function as an argument.
  The callback function is then called with the error as an argument. */
  const handleError = useHandleError()

  /* Using the useGDPRStatus hook to get the GDPR status of the user. */
  const gdpr = useGDPRStatus()

  /* Using the useAuthState hook to get the user from the firebase auth state. */
  const [auth] = useAuthState(firebase.auth())

  /* If the user is logged in, fetch the user's data from Firestore. */
  const [value, loading, error] = useDocumentDataOnce(
    auth && firebase.firestore().collection('users').doc(auth?.uid),
    { snapshotListenOptions: { includeMetadataChanges: true } }
  )

  // Session methods
  const {
    updateEmailVerificationStatus,
    saveUserToDB,
    getLastSessionFromLocalStorage,
    setSessionToLocalStorage,
    updateGDPRStatus
  } = useSessionActions()

  // Initial user saving to the DB
  useEffect(() => {
    // Check if there are user data in the DB
    const isNoUserDataInDB = auth && !value && !loading

    /* If there is no user data in the database, save the user data to the database. */
    isNoUserDataInDB &&
      saveUserToDB({
        id: auth.uid,
        email: auth.email,
        avatarUrl: auth.photoURL,
        agreement: true,
        gdpr,
        onError: handleError
      })
  }, [saveUserToDB, handleError, auth, value, loading, gdpr])

  // Updating user's email verification status
  useEffect(() => {
    // Check if data is loaded
    const isUserDataLoaded = auth && value && !loading

    // Updating email verification status
    isUserDataLoaded &&
      !value.emailVerified &&
      updateEmailVerificationStatus({
        id: auth.uid,
        sessionUserEmailVerified: auth?.emailVerified,
        dbUserEmailVerified: value?.emailVerified,
        onError: handleError
      })
  }, [auth, updateEmailVerificationStatus, value, loading, handleError])

  // Updating LS with user session info
  useEffect(() => {
    const isUserDataLoaded = auth && value && !loading
    if (isUserDataLoaded) {
      const lastSession = getLastSessionFromLocalStorage()
      lastSession?.email !== auth?.email &&
        /* Set the session to the user's local storage. */
        setSessionToLocalStorage({
          email: auth.email,
          avatarUrl: auth.photoURL,
          provider: localStorage.getItem('lastSessionProvider')
        })
    }
  }, [
    auth,
    value,
    loading,
    getLastSessionFromLocalStorage,
    setSessionToLocalStorage
  ])

  // Update GDPR status
  useEffect(() => {
    /* This is a ternary operator. It is checking if the user, value, and loading variables are all
    true. If they are, it will return true. Otherwise, it will return false. */
    const isUserDataLoaded = auth && value && !loading

    /* If the user is logged in, and the user's data is loaded, and the user's data has not yet been
    updated to reflect the new GDPR status, then update the user's data to reflect the new GDPR
    status. */
    if (isUserDataLoaded && !value?.gdpr && gdpr !== value?.gdpr)
      updateGDPRStatus({ id: auth?.uid, gdpr, onError: handleError })
  }, [gdpr, auth, value, updateGDPRStatus, handleError, loading])

  // Handling user fetching error
  useEffect(() => {
    error && handleError(error)
  }, [error, handleError])

  // Preparing context
  const contextData = useMemo(() => {
    const isUserLoaded = value && !loading
    return { user: value, loading, loaded: isUserLoaded }
  }, [loading, value])

  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>
  )
}

UserProvider.propTypes = { children: PropTypes.node }

export default UserProvider
