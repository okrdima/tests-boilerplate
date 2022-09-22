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
  Link
} from '@qonsoll/react-design'
import { useParams, useHistory, useLocation } from 'react-router-dom'
import { useDocument } from 'services/api/rest'
import { useStateWithStorage } from 'hooks'
import { MaterialKeywords } from 'domains/Material/components'
import { MaterialCategory } from 'domains/Material/components'
import { MaterialMaterialType } from 'domains/Material/components'

const MaterialAdvancedView = (props) => {
  // [COMPONENT_STATE_HOOKS]
  const [activeTab, setActiveTab] = useStateWithStorage(
    null,
    'material-advanced-view-active-tab'
  )

  // [ADDITIONAL_HOOKS]
  const { t } = useTranslations()
  const history = useHistory()
  const params = useParams()
  const location = useLocation()
  const { materialId } = params
  const [material, loading] = useDocument({ ref: `materials/${materialId}` })

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
              <Text fontWeight="bold">{t('Url')}:</Text>
            </Col>
            <Col h="right">
              <Link>{material?.url}</Link>
            </Col>
          </Row>
          <Row noGutters v="center">
            <Col h="left">
              <Text fontWeight="bold">{t('Keywords')}:</Text>
            </Col>
            <Col cw="auto" h="right">
              <MaterialKeywords
                emptyProps={{ withIllustration: false, withCreate: false }}
                material={material}
              />
            </Col>
            <Divider my={2} />
          </Row>
          <Row noGutters v="center">
            <Col h="left">
              <Text fontWeight="bold">{t('Category')}:</Text>
            </Col>
            <Col cw="auto" h="right">
              <MaterialCategory
                emptyProps={{ withIllustration: false, withCreate: false }}
                material={material}
              />
            </Col>
            <Divider my={2} />
          </Row>
          <Row noGutters v="center">
            <Col h="left">
              <Text fontWeight="bold">{t('Type')}:</Text>
            </Col>
            <Col cw="auto" h="right">
              <MaterialMaterialType
                emptyProps={{ withIllustration: false, withCreate: false }}
                material={material}
              />
            </Col>
          </Row>
        </Card>
      </Container>
    </Container>
  )
}

MaterialAdvancedView.propTypes = {}

export default MaterialAdvancedView
