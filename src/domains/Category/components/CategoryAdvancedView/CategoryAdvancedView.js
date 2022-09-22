import { Col, Container, Row, Spin, Title } from '@qonsoll/react-design'

import { Card } from 'antd'
import { useDocument } from 'services/api/rest'
import { useParams } from 'react-router-dom'

const CategoryAdvancedView = (props) => {
  const { categoryId } = useParams()
  const [category, loading] = useDocument({ ref: `categories/${categoryId}` })

  return loading ? (
    <Spin />
  ) : (
    <Container>
      <Container mb={4}>
        <Card>
          <Row noGutters mb={2} v="center">
            <Col h="left">
              <Title level={3}>{category?.name}</Title>
            </Col>
          </Row>
        </Card>
      </Container>
    </Container>
  )
}

CategoryAdvancedView.propTypes = {}

export default CategoryAdvancedView
