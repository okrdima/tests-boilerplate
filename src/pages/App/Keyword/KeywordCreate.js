import { useTranslations } from 'contexts/Translation'
import { HeaderBreadcrumbs, Spinner } from 'components'
import { PageWrapper, Row, Col } from '@qonsoll/react-design'
import { useParams, useHistory } from 'react-router-dom'
import { KeywordAdvancedForm } from 'domains/Keyword/components'

const KeywordCreate = (props) => {
  // [ADDITIONAL_HOOKS]
  const { t } = useTranslations()
  const history = useHistory()

  // [COMPONENT_STATE_HOOKS]

  // [COMPUTED_PROPERTIES]
  const headingProps = {
    title: t('Keyword create'),
    titleSize: 3,
    marginBottom: 3,
    textAlign: 'left'
  }

  // [HANDLERS]
  const handleBackButtonClick = () => history.goBack()

  return (
    <PageWrapper
      onBack={handleBackButtonClick}
      breadcrumbs={<HeaderBreadcrumbs />}
      headingProps={headingProps}>
      <Row noGutters>
        <Col cw={[12, 12, 10, 8, 7]}>
          <KeywordAdvancedForm />
        </Col>
      </Row>
    </PageWrapper>
  )
}

export default KeywordCreate
