import { Box, Container, Dropdown, Menu, MenuItem } from '@qonsoll/react-design'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { useTranslations } from 'contexts/Translation'

/**
 * It renders a box with a dropdown menu that can be used to edit or delete the document
 * @param props - The props that are passed to the component.
 * @returns A CardDropdown component that is a wrapper for the children passed in.
 */
const CardDropdown = (props) => {
  const {
    onEdit,
    onDelete,
    children,
    onDoubleClick,
    onClick,
    document,
    index,
    ...rest
  } = props

  // [ADDITIONAL_HOOKS]
  const { t } = useTranslations()

  // [HANDLERS]
  const handleEdit = (e) => {
    e.domEvent?.stopPropagation()
    onEdit?.(document, index)
  }
  const handleDelete = (e) => {
    e.domEvent?.stopPropagation()
    onDelete?.(document, index)
  }

  // [COMPUTED_PROPERTIES]
  const hasDropdownActions = useMemo(
    () => onEdit || onDelete,
    [onEdit, onDelete]
  )
  const Wrapper = useMemo(
    () => (hasDropdownActions ? Dropdown : Container),
    [hasDropdownActions]
  )
  const cursorComputed = useMemo(
    () => (onDoubleClick || onClick ? 'pointer' : 'default'),
    [onDoubleClick, onClick]
  )
  const wrapperProps = hasDropdownActions
    ? {
        trigger: ['contextMenu'],
        overlay: (
          <Menu>
            {onEdit && (
              <MenuItem key="edit" icon={<EditOutlined />} onClick={handleEdit}>
                {t('Edit')}
              </MenuItem>
            )}
            {onDelete && (
              <MenuItem
                key="delete"
                icon={<DeleteOutlined />}
                danger
                onClick={handleDelete}>
                {t('Delete')}
              </MenuItem>
            )}
          </Menu>
        )
      }
    : {}

  return (
    <Wrapper {...wrapperProps}>
      <Box
        cursor={cursorComputed}
        onDoubleClick={onDoubleClick}
        onClick={onClick}
        {...rest}>
        {children}
      </Box>
    </Wrapper>
  )
}

CardDropdown.propTypes = {
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onDoubleClick: PropTypes.func,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  document: PropTypes.object.isRequired,
  index: PropTypes.number
}

export default CardDropdown
