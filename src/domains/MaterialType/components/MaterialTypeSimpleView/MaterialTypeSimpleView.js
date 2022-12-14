import PropTypes from 'prop-types'
import { MaterialTypeSimpleForm } from 'domains/MaterialType/components'
import { Col, Row, Button, Title } from '@qonsoll/react-design'
import { CardDropdown, SelectableCard } from 'components'
import { useSimpleFormActions } from 'hooks'
import { useState } from 'react'
import { CloseOutlined, CheckOutlined } from '@ant-design/icons'
import { Form } from 'antd'

const MaterialTypeSimpleView = (props) => {
  const { materialType, onSelect, index, isSelected, actions } = props

  // [COMPONENT_STATE_HOOKS]
  const [isEditing, setIsEditing] = useState(false)
  const [form] = Form.useForm()

  // [ADDITIONAL_HOOKS]
  const {
    handleDelete: removeDocument,
    handleCancel,
    handleSave,
    handleEdit
  } = useSimpleFormActions({
    document: materialType,
    collectionName: 'materialTypes',
    form,
    changeStateAction: setIsEditing
  })

  // [HANDLERS]
  const handleDelete = () => removeDocument()
  const handleSelect = (e) => {
    e.stopPropagation()
    onSelect?.(materialType?._id)
  }

  return (
    <CardDropdown
      onDelete={handleDelete}
      onEdit={handleEdit}
      onClick={handleSelect}
      document={materialType}
      index={index}
      {...actions}>
      <SelectableCard isSelected={isSelected}>
        {!isEditing ? (
          <Row cursor="pointer" noGutters>
            <Col>
              <Row
                noGutters
                justifyContent="center"
                alignItems="center"
                py="4px"
                mb={2}>
                <Col>
                  <Title
                    level={4}
                    overflow="hidden"
                    textOverflow="ellipsis"
                    maxWidth="250px"
                    whiteSpace="nowrap">
                    {materialType?.name}
                  </Title>
                </Col>
              </Row>
            </Col>
          </Row>
        ) : (
          <Row noOuterGutters v="center">
            <Col mb="calc(var(--ql-form-item-vertical-spacing-without-message) * -1)">
              <MaterialTypeSimpleForm
                onSubmit={handleSave}
                form={form}
                initialValues={materialType}
                showTitle={false}
              />
            </Col>
            <Col cw="auto" display="block">
              <Button
                ghost
                onClick={handleCancel}
                shape="circle"
                type="primary"
                icon={<CloseOutlined />}
              />
              <Button
                ml="8px"
                shape="circle"
                type="primary"
                onClick={handleSave}
                icon={<CheckOutlined />}
              />
            </Col>
          </Row>
        )}
      </SelectableCard>
    </CardDropdown>
  )
}

MaterialTypeSimpleView.propTypes = {
  materialType: PropTypes.object,
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

export default MaterialTypeSimpleView
