import { useTranslations } from 'contexts/Translation'
import PropTypes from 'prop-types'
import { Tabs, Card } from 'antd'
import { StickyContainer, Sticky } from 'react-sticky'
import {
  Container,
  Row,
  Col,
  Spin,
  Divider,
  Text,
  Title
} from '@qonsoll/react-design'
import { useParams, useHistory, useLocation } from 'react-router-dom'
import { useDocument } from 'services/api/rest'
import { useStateWithStorage } from 'hooks'
import { ArticleMaterials } from 'domains/Article/components'

const ArticleAdvancedView = (props) => {
  // [COMPONENT_STATE_HOOKS]
  const [activeTab, setActiveTab] = useStateWithStorage(
    null,
    'article-advanced-view-active-tab'
  )

  // [ADDITIONAL_HOOKS]
  const { t } = useTranslations()
  const history = useHistory()
  const params = useParams()
  const location = useLocation()
  const { articleId } = params
  const [article, loading] = useDocument({ ref: `articles/${articleId}` })

  // [COMPUTED_PROPERTIES]
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
