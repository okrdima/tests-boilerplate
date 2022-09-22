import { Col, PageWrapper, Row } from '@qonsoll/react-design'
import { useHistory, useParams } from 'react-router-dom'

import { Button } from '@qonsoll/react-design'
import { EditOutlined } from '@ant-design/icons'
import { HeaderBreadcrumbs } from 'components'
import { KeywordAdvancedView } from 'domains/Keyword/components'
import { useTranslations } from 'contexts/Translation'

const KeywordShow = (props) => {
  const { t } = useTranslations()
  const history = useHistory()
  const { keywordId } = useParams()

  const headingProps = {
    title: t('Keyword show'),
    titleSize: 3,
    marginBottom: 3,
    textAlign: 'left'
  }

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
