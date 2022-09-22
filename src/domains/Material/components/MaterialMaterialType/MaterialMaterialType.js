import { Container, Row, Col, Text } from '@qonsoll/react-design'
import { useGetMaterialMaterialType } from '../../hooks'
import PropTypes from 'prop-types'
import { Spinner } from 'components'
import { useTranslations } from 'contexts/Translation'

export default function MaterialMaterialType(props) {
  const { material } = props

  // [ADDITIONAL_HOOKS]
  const [materialType, loading] = useGetMaterialMaterialType(material)
  const { t } = useTranslations()

  return (
    <Container>
      <Row noGutters>
        <Col>
          {loading ? (
            <Spinner flex={1} />
          ) : materialType ? (
            <Text>{materialType?.name}</Text>
          ) : (
            <Text type="secondary" variant="overline">
              {t('No material types have been added yet')}
            </Text>
          )}
        </Col>
      </Row>
    </Container>
  )
}

MaterialMaterialType.propTypes = {
  material: PropTypes.object.isRequired
}
