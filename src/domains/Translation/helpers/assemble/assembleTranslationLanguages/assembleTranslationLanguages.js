import { LANGUAGES } from '../../../__constants__'

/**
 * It takes in an object with two properties, `enLabel` and `noLabel`, and returns an array of objects
 * with the same shape as the `LANGUAGES` constant, but with the `value` property set to the value of
 * the `enLabel` or `noLabel` property, depending on the language
 * @returns An array of objects with the following shape:
 * {
 *   shortCode: 'en',
 *   label: 'English',
 *   value: 'English'
 * },
 * {
 *   shortCode: 'no',
 *   label: 'Norwegian',
 *   value: 'Norwegian'
 * }
 */
const assembleTranslationLanguages = ({ enLabel = '', noLabel = '' }) => {
  return LANGUAGES?.map((lang) => {
    const languageShortCodeToStateMap = {
      en: enLabel,
      no: noLabel
    }

    return {
      ...lang,
      value: languageShortCodeToStateMap[lang?.shortCode]
    }
  })
}

export default assembleTranslationLanguages
