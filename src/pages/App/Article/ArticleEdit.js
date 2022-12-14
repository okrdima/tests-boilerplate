import { useTranslations } from 'contexts/Translation'
import { HeaderBreadcrumbs, Spinner } from 'components'
import { PageWrapper, Row, Col } from '@qonsoll/react-design'
import { useParams, useHistory } from 'react-router-dom'
import { ArticleAdvancedForm } from 'domains/Article/components'
import { useGetArticleInitialValues } from 'domains/Article/hooks'

const ArticleEdit = (props) => {
  // [ADDITIONAL_HOOKS]
  const { t } = useTranslations()
  const history = useHistory()
  const params = useParams()
  const { articleId } = params
  const [initialValues, loading] = useGetArticleInitialValues(articleId)

  // [COMPONENT_STATE_HOOKS]

  // [COMPUTED_PROPERTIES]
  const headingProps = {
    title: t('Article edit'),
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
            <Spinner height="70vh" text={t('Article loading')} />
          </Col>
        ) : (
          <Col cw={[12, 12, 10, 8, 7]}>
            <ArticleAdvancedForm initialData={initialValues} />
          </Col>
        )}
      </Row>
    </PageWrapper>
  )
}

export default ArticleEdit
