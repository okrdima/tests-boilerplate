import { Col, Container, Row, Spin, Title } from '@qonsoll/react-design'

import { Card } from 'antd'
import { useDocument } from 'services/api/rest'
import { useParams } from 'react-router-dom'

const KeywordAdvancedView = (props) => {
  const params = useParams()

  const { keywordId } = params || {}
  const [keyword, loading] = useDocument({ ref: `keywords/${keywordId}` })

  return loading ? (
    <Spin />
  ) : (
    <Container>
      <Container mb={4}>
        <Card>
          <Row noGutters mb={2} v="center">
            <Col h="left">
              <Title level={3}>{keyword?.name}</Title>
            </Col>
          </Row>
        </Card>
      </Container>
    </Container>
  )
}

KeywordAdvancedView.propTypes = {}

export default KeywordAdvancedView
