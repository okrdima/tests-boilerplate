import { Select } from 'antd'
import { useMemo } from 'react'
import { useTranslations } from 'contexts/Translation'

const LanguageSelect = () => {
  // [ADDITIONAL HOOKS]
  const { setCurrentLanguage, language, languages, loading } = useTranslations()

  // [HANDLERS]
  const handleChange = ({ value }) => {
    setCurrentLanguage(value)
    // moment.locale(shortCodeLanguage === 'no' ? 'nb' : shortCodeLanguage)
  }

  // [COMPUTED PROPERTIES]
  const options = useMemo(
    () =>
      languages
        .filter(({ value }) => value !== language)
        .map(({ name, value, label }) => ({ label, name, value })),
    [language, languages]
  )
  const defaultLanguage = useMemo(
    () => languages.find(({ value }) => value === language),
    [language, languages]
  )

  return (
    <Select
      labelInValue
      onSelect={handleChange}
      defaultValue={defaultLanguage}
      options={options}
      loading={loading}
    />
  )
}

export default LanguageSelect
