import { useTranslations } from 'contexts/Translation'
import { HeaderBreadcrumbs } from 'components'
import { PageWrapper, Row, Col } from '@qonsoll/react-design'
import { useParams, useHistory } from 'react-router-dom'
import { ArticleAdvancedView } from 'domains/Article/components'
import { EditOutlined } from '@ant-design/icons'
import { Button } from '@qonsoll/react-design'

const ArticleShow = (props) => {
  // [ADDITIONAL_HOOKS]
  const { t } = useTranslations()
  const history = useHistory()
  const params = useParams()

  // [COMPONENT_STATE_HOOKS]

  // [COMPUTED_PROPERTIES]
  const headingProps = {
    title: t('Article show'),
    titleSize: 3,
    marginBottom: 3,
    textAlign: 'left'
  }
  const { articleId } = params

  // [HANDLERS]
  const handleBackButtonClick = () => history.goBack()

  return (
    <PageWrapper
      action={
        <Button
          icon={<EditOutlined />}
          onClick={() => history.push(`/articles/${articleId}/edit`)}>
          {t('Edit')}
        </Button>
      }
      onBack={handleBackButtonClick}
      breadcrumbs={<HeaderBreadcrumbs />}
      headingProps={headingProps}>
      <Row noGutters>
        <Col>
          <ArticleAdvancedView />
        </Col>
      </Row>
    </PageWrapper>
  )
}

export default ArticleShow
