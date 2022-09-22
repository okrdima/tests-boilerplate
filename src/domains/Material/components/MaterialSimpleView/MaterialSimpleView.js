import { useTranslations } from 'contexts/Translation'
import PropTypes from 'prop-types'
import {
  Col,
  Container,
  Row,
  Card,
  Text,
  Divider,
  Title,
  Link
} from '@qonsoll/react-design'
import { useHistory } from 'react-router-dom'
import { CardDropdown, SelectableCard } from 'components'
import { useSimpleFormActions } from 'hooks'
import { useParams } from 'react-router-dom'

const MaterialSimpleView = (props) => {
  const { material, onSelect, onDelete, index, isSelected, actions } = props

  // [ADDITIONAL_HOOKS]
  const { t } = useTranslations()
  const history = useHistory()
  const { handleDelete: removeDocument } = useSimpleFormActions({
    document: material,
    collectionName: 'materials'
  })
  const params = useParams()

  // [HANDLERS]
  const handleOpen = () => {
    history.push(`/materials/${material?._id}`)
  }
  const handleEdit = () => {
    history.push(`/materials/${material?._id}/edit`)
  }
  const handleDelete = () => removeDocument()
  const handleSelect = (e) => {
    e.stopPropagation()
    onSelect?.(material?._id)
  }

  return (
    <CardDropdown
      onDelete={handleDelete}
      onEdit={handleEdit}
      onDoubleClick={handleOpen}
      onClick={handleSelect}
      document={material}
      index={index}
      {...actions}>
      <SelectableCard isSelected={isSelected}>
        <Row
          noGutters
          justifyContent="center"
          alignItems="center"
          py="4px"
          mb={2}>
          <Col>
            <Title level={4}>{t('Material')}</Title>
          </Col>
        </Row>
        <Row
          noGutters
          justifyContent="center"
          alignItems="center"
          py="4px"
          mb={2}>
          <Col>
            <Text>{t('Url')}</Text>
          </Col>
          <Col cw="auto">
            <Link
              overflow="hidden"
              textOverflow="ellipsis"
              maxWidth="250px"
              whiteSpace="nowrap">
              {material?.url}
            </Link>
          </Col>
        </Row>
      </SelectableCard>
    </CardDropdown>
  )
}

MaterialSimpleView.propTypes = {
  material: PropTypes.object,
  onSelect: PropTypes.func,
  onDelete: PropTypes.func,
  index: PropTypes.number,
  isSelected: PropTypes.bool,
  actions: PropTypes.shape({
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onDoubleClick: PropTypes.func,
    onClick: PropTypes.func
  })
}

export default MaterialSimpleView
