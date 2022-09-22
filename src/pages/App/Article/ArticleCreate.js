import { useTranslations } from 'contexts/Translation'
import { HeaderBreadcrumbs } from 'components'
import { PageWrapper, Row, Col } from '@qonsoll/react-design'
import { useHistory } from 'react-router-dom'
import { ArticleAdvancedForm } from 'domains/Article/components'

const ArticleCreate = (props) => {
  // [ADDITIONAL_HOOKS]
  const { t } = useTranslations()
  const history = useHistory()

  // [COMPONENT_STATE_HOOKS]

  // [COMPUTED_PROPERTIES]
  const headingProps = {
    title: t('Article create'),
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
          <ArticleAdvancedForm />
        </Col>
      </Row>
    </PageWrapper>
  )
}

export default ArticleCreate
