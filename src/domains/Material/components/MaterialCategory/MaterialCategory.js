import { Container, Row, Col, Text } from '@qonsoll/react-design'
import { useGetMaterialCategory } from '../../hooks'
import PropTypes from 'prop-types'
import { Spinner } from 'components'
import { useTranslations } from 'contexts/Translation'

export default function MaterialCategory(props) {
  const { material } = props

  // [ADDITIONAL_HOOKS]
  const [category, loading] = useGetMaterialCategory(material)
  const { t } = useTranslations()

  return (
    <Container>
      <Row noGutters>
        <Col>
          {loading ? (
            <Spinner flex={1} />
          ) : category ? (
            <Text>{category?.name}</Text>
          ) : (
            <Text type="secondary" variant="overline">
              {t('No categories have been added yet')}
            </Text>
          )}
        </Col>
      </Row>
    </Container>
  )
}

MaterialCategory.propTypes = {
  material: PropTypes.object.isRequired
}
