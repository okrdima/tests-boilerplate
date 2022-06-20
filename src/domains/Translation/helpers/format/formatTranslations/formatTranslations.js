/**
 * Function converts obj from RDB to the array of objects
 * It takes an object with two keys, `en` and `no`, and returns an array of objects with three keys,
 * `original`, `en` and `no`
 * @param obj - The object that contains the translations
 * @returns An array of objects with the following structure:
 *   {
 *     original: 'label',
 *     en: 'translation',
 *     no: 'translation'
 *   }
 */
const formatTranslations = (obj) => {
  const labels = obj?.en && Object.keys(obj.en)
  let formattedTranslations = []
  labels.length &&
    labels.forEach((label) => {
      formattedTranslations.push({
        original: label,
        en: obj.en[label],
        no: obj.no[label]
      })
    })

  return formattedTranslations
}

export default formatTranslations
