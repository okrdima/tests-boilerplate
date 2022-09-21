import { Col, Row, Text } from '@qonsoll/react-design'
import { cloneElement, useRef, useState } from 'react'

import { AddItemCard } from 'modules/admin-module/components'
import PropTypes from 'prop-types'
import { useTranslations } from 'contexts/Translation'

const SettingsCombinedList = (props) => {
  const {
    items,
    children,
    listView,
    onClickAction,
    hideAddCard,
    responsiveColWidthArr,
    height,
    defaultItem
  } = props

  const [selectedItem, setSelectedItem] = useState(null)

  const onSelectedItem = (item) => item?._id === selectedItem

  const { t } = useTranslations()
  const AddItemCardWrapper = useRef()

  return (
    <Row negativeBlockMargin>
      {!hideAddCard && (
        <Col
          ref={AddItemCardWrapper}
          cw={listView ? 12 : responsiveColWidthArr || [12, 6, 4]}
          mb={4}>
          <AddItemCard onClickAction={onClickAction} height={height} />
        </Col>
      )}
      {items?.length > 0 ? (
        items?.map((item, index) => (
          <Col
            mb={4}
            key={item?._id || index}
            cw={listView ? 12 : responsiveColWidthArr || [12, 6, 4]}>
            {cloneElement(children, {
              item: item,
              index,
              onSelect: setSelectedItem,
              isSelected: onSelectedItem(item),
              defaultItem
            })}
          </Col>
        ))
      ) : (
        <Col cw={12}>
          <Text variant="overline" type="secondary">
            {t(`No items have been created yet`)}
          </Text>
        </Col>
      )}
    </Row>
  )
}
SettingsCombinedList.propTypes = {
  children: PropTypes.node,
  items: PropTypes.array,
  listView: PropTypes.bool,
  hideAddCard: PropTypes.bool,
  onClickAction: PropTypes.func,
  responsiveColWidthArr: PropTypes.array,
  height: PropTypes.number,
  defaultItem: PropTypes.object
}

export default SettingsCombinedList
