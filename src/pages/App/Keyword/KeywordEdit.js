import { useTranslations } from 'contexts/Translation'
import { HeaderBreadcrumbs, Spinner } from 'components'
import { PageWrapper, Row, Col } from '@qonsoll/react-design'
import { useParams, useHistory } from 'react-router-dom'
import { KeywordAdvancedForm } from 'domains/Keyword/components'
import { useGetKeywordInitialValues } from 'domains/Keyword/hooks'
import { useLoading } from 'hooks'
import { useDocument } from 'services/api/rest'
import { Spin } from '@qonsoll/react-design'

const KeywordEdit = (props) => {
  // [ADDITIONAL_HOOKS]
  const { t } = useTranslations()
  const history = useHistory()
  const params = useParams()
  const { keywordId } = params
  const [initialValues, loading] = useGetKeywordInitialValues(keywordId)

  // [COMPONENT_STATE_HOOKS]

  // [COMPUTED_PROPERTIES]
  const headingProps = {
    title: t('Keyword edit'),
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
        {loading ? (
          <Col>
            <Spinner height="70vh" text={t('Keyword loading')} />
          </Col>
        ) : (
          <Col cw={[12, 12, 10, 8, 7]}>
            <KeywordAdvancedForm initialData={initialValues} />
          </Col>
        )}
      </Row>
    </PageWrapper>
  )
}

export default KeywordEdit
