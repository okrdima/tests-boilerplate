import { useTranslations } from 'contexts/Translation'
import PropTypes from 'prop-types'
import { Row, Col, Text } from '@qonsoll/react-design'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { KeywordSimpleView } from 'domains/Keyword/components'

const KeywordList = (props) => {
  const { keywords, isListWithCreate, listView, emptyProps, actions } = props

  // [COMPONENT_STATE_HOOKS]
  const [selectedItem, setSelectedItem] = useState(null)

  // [ADDITIONAL_HOOKS]
  const { t } = useTranslations()

  // [HANDLERS]
  const onEmptySpaceClick = () => setSelectedItem(null)

  return (
    <Row onClick={onEmptySpaceClick} mx={-3}>
      {keywords?.length > 0 ? (
        keywords?.map((keyword, index) => (
          <Col
            mb={4}
            key={keyword?._id || index}
            cw={listView ? 12 : [12, 6, 4]}>
            <KeywordSimpleView
              actions={actions}
              index={index}
              isSelected={keyword?._id === selectedItem}
              onSelect={setSelectedItem}
              keyword={keyword}
            />
          </Col>
        ))
      ) : (
        <Col cw={isListWithCreate ? 'auto' : 12}>
          <Text variant="overline" type="secondary">
            {emptyProps?.message || t('No keywords have been created yet')}
          </Text>
        </Col>
      )}
    </Row>
  )
}

KeywordList.propTypes = {
  keywords: PropTypes.array,
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

export default KeywordList
