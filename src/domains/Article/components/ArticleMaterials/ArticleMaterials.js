import { Container, Row, Col, Text } from '@qonsoll/react-design'
import { MaterialList } from '../../../Material/components'
import { useGetArticleMaterials } from '../../hooks'
import PropTypes from 'prop-types'
import { Spinner } from 'components'
import { useTranslations } from 'contexts/Translation'

export default function ArticleMaterials(props) {
  const { article } = props

  // [ADDITIONAL_HOOKS]
  const [materials, loading] = useGetArticleMaterials(article)
  const { t } = useTranslations()

  return (
    <Container>
      <Row noGutters>
        <Col>
          {loading ? (
            <Spinner flex={1} />
          ) : materials?.length ? (
            <MaterialList {...props} hideAddCard materials={materials} />
          ) : (
            <Text type="secondary" variant="overline">
              {t('No materials have been added yet')}
            </Text>
          )}
        </Col>
      </Row>
    </Container>
  )
}

ArticleMaterials.propTypes = {
  article: PropTypes.object.isRequired
}
