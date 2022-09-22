import { useTranslations } from 'contexts/Translation'
import PropTypes from 'prop-types'
import { Row, Col, Text } from '@qonsoll/react-design'
import { useState } from 'react'
import { MaterialSimpleView } from 'domains/Material/components'

const MaterialList = (props) => {
  const { materials, isListWithCreate, listView, emptyProps, actions } = props

  // [COMPONENT_STATE_HOOKS]
  const [selectedItem, setSelectedItem] = useState(null)

  // [ADDITIONAL_HOOKS]
  const { t } = useTranslations()

  // [HANDLERS]
  const onEmptySpaceClick = () => setSelectedItem(null)

  return (
    <Row onClick={onEmptySpaceClick} mx={-3}>
      {materials?.length > 0 ? (
        materials?.map((material, index) => (
          <Col
            mb={4}
            key={material?._id || index}
            cw={listView ? 12 : [12, 6, 4]}>
            <MaterialSimpleView
              actions={actions}
              index={index}
              isSelected={material?._id === selectedItem}
              onSelect={setSelectedItem}
              material={material}
            />
          </Col>
        ))
      ) : (
        <Col cw={isListWithCreate ? 'auto' : 12}>
          <Text variant="overline" type="secondary">
            {emptyProps?.message || t('No materials have been created yet')}
          </Text>
        </Col>
      )}
    </Row>
  )
}

MaterialList.propTypes = {
  materials: PropTypes.array,
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

export default MaterialList
