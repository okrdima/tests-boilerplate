import { Container, Row, Col, Text, Box } from '@qonsoll/react-design'
import { useGetMaterialKeywords } from '../../hooks'
import { Tag } from 'antd'
import PropTypes from 'prop-types'
import { Spinner } from 'components'
import { useTranslations } from 'contexts/Translation'

export default function MaterialKeywords(props) {
  const { material } = props

  // [ADDITIONAL_HOOKS]
  const [keywords, loading] = useGetMaterialKeywords(material)
  const { t } = useTranslations()

  return (
    <Container>
      <Row h="right" noGutters>
        <Col>
          {loading ? (
            <Spinner flex={1} />
          ) : keywords?.length ? (
            <Box mr="-8px">
              {keywords?.map((keyword) => (
                <Tag key={keyword?._id}>
                  <Text>{keyword?.name}</Text>
                </Tag>
              ))}
            </Box>
          ) : (
            <Text type="secondary" variant="overline">
              {t('No keywords have been added yet')}
            </Text>
          )}
        </Col>
      </Row>
    </Container>
  )
}

MaterialKeywords.propTypes = {
  material: PropTypes.object.isRequired
}
