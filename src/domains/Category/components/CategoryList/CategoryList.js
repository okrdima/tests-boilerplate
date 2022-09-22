import { useTranslations } from 'contexts/Translation'
import PropTypes from 'prop-types'
import { Row, Col, Text } from '@qonsoll/react-design'
import { useState } from 'react'
import { CategorySimpleView } from 'domains/Category/components'

const CategoryList = (props) => {
  const { categories, isListWithCreate, listView, emptyProps, actions } = props

  // [COMPONENT_STATE_HOOKS]
  const [selectedItem, setSelectedItem] = useState(null)

  // [ADDITIONAL_HOOKS]
  const { t } = useTranslations()

  // [HANDLERS]
  const onEmptySpaceClick = () => setSelectedItem(null)

  return (
    <Row onClick={onEmptySpaceClick} mx={-3}>
      {categories?.length > 0 ? (
        categories?.map((category, index) => (
          <Col
            mb={4}
            key={category?._id || index}
            cw={listView ? 12 : [12, 6, 4]}>
            <CategorySimpleView
              actions={actions}
              index={index}
              isSelected={category?._id === selectedItem}
              onSelect={setSelectedItem}
              category={category}
            />
          </Col>
        ))
      ) : (
        <Col cw={isListWithCreate ? 'auto' : 12}>
          <Text variant="overline" type="secondary">
            {emptyProps?.message || t('No categories have been created yet')}
          </Text>
        </Col>
      )}
    </Row>
  )
}

CategoryList.propTypes = {
  categories: PropTypes.array,
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

export default CategoryList
