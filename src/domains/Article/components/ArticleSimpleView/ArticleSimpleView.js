import { CardDropdown, SelectableCard } from 'components'
import { Col, Row, Title } from '@qonsoll/react-design'

import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useSimpleFormActions } from 'hooks'

const ArticleSimpleView = (props) => {
  const { article, onSelect, index, isSelected, actions } = props

  const history = useHistory()
  const { handleDelete: removeDocument } = useSimpleFormActions({
    document: article,
    collectionName: 'articles'
  })

  const handleOpen = () => {
    history.push(`/articles/${article?._id}`)
  }
  const handleEdit = () => {
    history.push(`/articles/${article?._id}/edit`)
  }
  const handleDelete = () => removeDocument()
  const handleSelect = (e) => {
    e.stopPropagation()
    onSelect?.(article?._id)
  }

  return (
    <CardDropdown
      onDelete={handleDelete}
      onEdit={handleEdit}
      onDoubleClick={handleOpen}
      onClick={handleSelect}
      document={article}
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
            <Title
              level={4}
              overflow="hidden"
              textOverflow="ellipsis"
              maxWidth="250px"
              whiteSpace="nowrap">
              {article?.name}
            </Title>
          </Col>
        </Row>
      </SelectableCard>
    </CardDropdown>
  )
}

ArticleSimpleView.propTypes = {
  article: PropTypes.object,
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

export default ArticleSimpleView
