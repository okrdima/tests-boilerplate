import { Card, Tabs } from 'antd'
import { Col, Container, Row, Spin, Title } from '@qonsoll/react-design'
import { useHistory, useParams } from 'react-router-dom'

import { ArticleMaterials } from 'domains/Article/components'
import { StickyContainer } from 'react-sticky'
import { useDocument } from 'services/api/rest'
import { useStateWithStorage } from 'hooks'
import { useTranslations } from 'contexts/Translation'

const ArticleAdvancedView = () => {
  const [activeTab, setActiveTab] = useStateWithStorage(
    null,
    'article-advanced-view-active-tab'
  )

  const { t } = useTranslations()
  const history = useHistory()
  const params = useParams()
  const { articleId } = params

  const [article, loading] = useDocument({ ref: `articles/${articleId}` })

  const { TabPane } = Tabs

  const changeTab = (key) => {
    if (params && articleId) {
      if (key.includes(`articles/${articleId}`)) {
        history.push(key)
      }
      setActiveTab(key)
    }
  }

  return loading ? (
    <Spin />
  ) : (
    <Container>
      <Container mb={4}>
        <Card>
          <Row noGutters mb={2} v="center">
            <Col h="left">
              <Title level={3}>{article?.name}</Title>
            </Col>
          </Row>
        </Card>
      </Container>
      <Row noGutters mb={4}>
        <Col>
          <StickyContainer>
            <Tabs defaultActiveKey={activeTab} onChange={changeTab}>
              <TabPane tab={t('Materials')} key="#material">
                <ArticleMaterials
                  emptyProps={{ withCreate: false }}
                  article={article}
                />
              </TabPane>
            </Tabs>
          </StickyContainer>
        </Col>
      </Row>
    </Container>
  )
}

ArticleAdvancedView.propTypes = {}

export default ArticleAdvancedView
