import { useTranslations } from 'contexts/Translation'
import PropTypes from 'prop-types'
import { Row, Col, Text } from '@qonsoll/react-design'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ArticleSimpleView } from 'domains/Article/components'

const ArticleList = (props) => {
  const { articles, isListWithCreate, listView, emptyProps, actions } = props

  // [COMPONENT_STATE_HOOKS]
  const [selectedItem, setSelectedItem] = useState(null)

  // [ADDITIONAL_HOOKS]
  const { t } = useTranslations()

  // [HANDLERS]
  const onEmptySpaceClick = () => setSelectedItem(null)

  return (
    <Row onClick={onEmptySpaceClick} mx={-3}>
      {articles?.length > 0 ? (
        articles?.map((article, index) => (
          <Col
            mb={4}
            key={article?._id || index}
            cw={listView ? 12 : [12, 6, 4]}>
            <ArticleSimpleView
              actions={actions}
              index={index}
              isSelected={article?._id === selectedItem}
              onSelect={setSelectedItem}
              article={article}
            />
          </Col>
        ))
      ) : (
        <Col cw={isListWithCreate ? 'auto' : 12}>
          <Text variant="overline" type="secondary">
            {emptyProps?.message || t('No articles have been created yet')}
          </Text>
        </Col>
      )}
    </Row>
  )
}

ArticleList.propTypes = {
  articles: PropTypes.array,
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

export default ArticleList
