import { useTranslations } from 'contexts/Translation'
import { HeaderBreadcrumbs, Spinner } from 'components'
import { PageWrapper, Row, Col } from '@qonsoll/react-design'
import { useParams, useHistory } from 'react-router-dom'
import { KeywordAdvancedView } from 'domains/Keyword/components'
import { EditOutlined } from '@ant-design/icons'
import { Button } from '@qonsoll/react-design'

const KeywordShow = (props) => {
  // [ADDITIONAL_HOOKS]
  const { t } = useTranslations()
  const history = useHistory()
  const params = useParams()

  // [COMPONENT_STATE_HOOKS]

  // [COMPUTED_PROPERTIES]
  const headingProps = {
    title: t('Keyword show'),
    titleSize: 3,
    marginBottom: 3,
    textAlign: 'left'
  }
  const { keywordId } = params

  // [HANDLERS]
  const handleBackButtonClick = () => history.goBack()

  return (
    <PageWrapper
      action={
        <Button
          icon={<EditOutlined />}
          onClick={() => history.push(`/keywords/${keywordId}/edit`)}>
          {t('Edit')}
        </Button>
      }
      onBack={handleBackButtonClick}
      breadcrumbs={<HeaderBreadcrumbs />}
      headingProps={headingProps}>
      <Row noGutters>
        <Col>
          <KeywordAdvancedView />
        </Col>
      </Row>
    </PageWrapper>
  )
}

export default KeywordShow
