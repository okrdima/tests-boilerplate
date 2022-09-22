import { Col, Container, Row, Spin, Title } from '@qonsoll/react-design'

import { Card } from 'antd'
import { useDocument } from 'services/api/rest'
import { useParams } from 'react-router-dom'

const MaterialTypeAdvancedView = (props) => {
  const { materialTypeId } = useParams() || {}

  const [materialType, loading] = useDocument({
    ref: `materialTypes/${materialTypeId}`
  })

  return loading ? (
    <Spin />
  ) : (
    <Container>
      <Container mb={4}>
        <Card>
          <Row noGutters mb={2} v="center">
            <Col h="left">
              <Title level={3}>{materialType?.name}</Title>
            </Col>
          </Row>
        </Card>
      </Container>
    </Container>
  )
}

MaterialTypeAdvancedView.propTypes = {}

export default MaterialTypeAdvancedView
