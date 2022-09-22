import { useTranslations } from 'contexts/Translation'
import PropTypes from 'prop-types'
import { Row, Col, Text } from '@qonsoll/react-design'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { MaterialTypeSimpleView } from 'domains/MaterialType/components'

const MaterialTypeList = (props) => {
  const { materialTypes, isListWithCreate, listView, emptyProps, actions } =
    props

  // [COMPONENT_STATE_HOOKS]
  const [selectedItem, setSelectedItem] = useState(null)

  // [ADDITIONAL_HOOKS]
  const { t } = useTranslations()

  // [HANDLERS]
  const onEmptySpaceClick = () => setSelectedItem(null)

  return (
    <Row onClick={onEmptySpaceClick} mx={-3}>
      {materialTypes?.length > 0 ? (
        materialTypes?.map((materialType, index) => (
          <Col
            mb={4}
            key={materialType?._id || index}
            cw={listView ? 12 : [12, 6, 4]}>
            <MaterialTypeSimpleView
              actions={actions}
              index={index}
              isSelected={materialType?._id === selectedItem}
              onSelect={setSelectedItem}
              materialType={materialType}
            />
          </Col>
        ))
      ) : (
        <Col cw={isListWithCreate ? 'auto' : 12}>
          <Text variant="overline" type="secondary">
            {emptyProps?.message ||
              t('No material types have been created yet')}
          </Text>
        </Col>
      )}
    </Row>
  )
}

MaterialTypeList.propTypes = {
  materialTypes: PropTypes.array,
  isListWithCreate: PropTypes.bool,
  listView: PropTypes.bool,
  emptyProps: PropTypes.object,
  actions: PropTypes.shape({
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onDoubleClick: PropTypes.func,
    onClick: PropTypes.func
  })
}

export default MaterialTypeList
