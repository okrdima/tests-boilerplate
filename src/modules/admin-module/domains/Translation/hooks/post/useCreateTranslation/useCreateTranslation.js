import { CURRENT_APP } from 'domains/Translation/__constants__'
import firebase from 'firebase/compat/app'
import { useTranslations } from 'contexts/Translation'

const useCreateTranslation = () => {
  // [ADDITIONAL HOOKS]
  const { saveTranslationForLanguage } = useTranslations()

  // [HELPER FUNCTIONS]
  const saveTranslations = ({ textLabel, shortCode, refEnding }) => {
    const appNameComputed = CURRENT_APP
    /* Creating a reference to the database. */
    const ref = `translations/${appNameComputed}/${shortCode}/${refEnding}`
    return firebase.database().ref(ref).set(textLabel)
  }
  const createAllTranslations = ({ languages, refEnding }) => {
    const promisesToCompute = languages?.map((lang) => {
      const save = saveTranslationForLanguage || saveTranslations
      return save?.({
        textLabel: lang.value,
        shortCode: lang?.shortCode,
        refEnding
      })
    })

    try {
      return Promise.all(promisesToCompute)
    } catch (error) {
      return error
    }
  }

  return { createAllTranslations }
}

export default useCreateTranslation
