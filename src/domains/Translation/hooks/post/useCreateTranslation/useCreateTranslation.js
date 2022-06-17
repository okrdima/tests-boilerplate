import { useTranslations } from '../../../../../contexts/Translation'

const useCreateTranslation = () => {
  // [ADDITIONAL HOOKS]
  const { saveTranslationForLanguage } = useTranslations()

  // [HELPER FUNCTIONS]
  const createAllTranslations = ({ languages, refEnding }) => {
    const promisesToCompute = languages?.map((lang) =>
      saveTranslationForLanguage?.({
        textLabel: lang.value,
        shortCode: lang?.shortCode,
        refEnding
      })
    )

    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const result = await Promise.all(promisesToCompute)

        resolve(result)
      } catch (error) {
        reject(Error(error))
      }
    })
  }

  return { createAllTranslations }
}

export default useCreateTranslation
