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

const MaterialTypeAdvancedView = (props) => {
  // [COMPONENT_STATE_HOOKS]
  const [activeTab, setActiveTab] = useStateWithStorage(
    null,
    'material-type-advanced-view-active-tab'
  )

  // [ADDITIONAL_HOOKS]
  const { t } = useTranslations()
  const history = useHistory()
  const params = useParams()
  const location = useLocation()
  const { materialTypeId } = params
  const [materialType, loading] = useDocument({
    ref: `materialTypes/${materialTypeId}`
  })

  // [COMPUTED_PROPERTIES]
  const { TabPane } = Tabs

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
