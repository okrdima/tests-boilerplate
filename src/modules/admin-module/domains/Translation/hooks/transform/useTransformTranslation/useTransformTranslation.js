import { useTranslations } from 'contexts/Translation'

const useTransformTranslation = () => {
  // [ADDITIONAL HOOKS]
  const { t } = useTranslations()

  // [HELPER FUNCTIONS
  /**
   * It returns a string that contains the duration and pause of a task
   * @param duration - The duration of the timer.
   * @param pause - The pause time in seconds.
   */
  const getStartTimeInformationTitle = (duration, pause) =>
    `${t('duration:')} ${duration || t('none')}${t(', pause:')} ${
      pause || t('no pause')
    }`

  return {
    getStartTimeInformationTitle
  }
}

export default useTransformTranslation
