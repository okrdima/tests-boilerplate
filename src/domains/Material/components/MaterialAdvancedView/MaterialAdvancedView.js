import {
  Col,
  Container,
  Divider,
  Link,
  Row,
  Spin,
  Text
} from '@qonsoll/react-design'

import { Card } from 'antd'
import { MaterialCategory } from 'domains/Material/components'
import { MaterialKeywords } from 'domains/Material/components'
import { MaterialMaterialType } from 'domains/Material/components'
import { useDocument } from 'services/api/rest'
import { useParams } from 'react-router-dom'
import { useTranslations } from 'contexts/Translation'

const MaterialAdvancedView = () => {
  const { t } = useTranslations()
  const params = useParams()
  const { materialId } = params

  const [material, loading] = useDocument({ ref: `materials/${materialId}` })

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
