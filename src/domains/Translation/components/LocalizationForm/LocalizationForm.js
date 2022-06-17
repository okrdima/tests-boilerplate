import { Col, Row, Title } from '@qonsoll/react-design'

import LocalizationItem from '../LocalizationItem'
import PropTypes from 'prop-types'
import { useGetTranslations } from '../../hooks'
import { useTranslations } from '../../../../contexts/Translation'

const LocalizationForm = (props) => {
  const { appName } = props

  // [ADDITIONAL HOOKS]
  const { t } = useTranslations()
  const [translations, loading, fetchTranslations] = useGetTranslations(appName)

  return (
    <>
      <Row mb={2} noOuterGutters>
        <Col>
          <Title level={5}>{t('English')}</Title>
        </Col>
        <Col>
          <Title level={5}>{t('Norwegian')}</Title>
        </Col>
      </Row>

      <Row mb={2} noOuterGutters height="100%" v="center">
        <Col>
          <LocalizationItem
            key={`${appName}-00`}
            appName={appName}
            enPlaceholder={t('Enter text for EN translation')}
            noPlaceholder={t('Enter text for NO translation')}
            withTooltips
            creationEnabled
            triggerTranslationsRefetch={fetchTranslations}
          />

          {!loading &&
            translations.map((translation, index) => (
              <LocalizationItem
                key={`${appName}-${index}`}
                appName={appName}
                data={translation}
              />
            ))}
        </Col>
      </Row>
    </>
  )
}

LocalizationForm.propTypes = {
  appName: PropTypes.string.isRequired,
  isPageLoading: PropTypes.bool,
  handleLoadingChange: PropTypes.func
}

export default LocalizationForm
