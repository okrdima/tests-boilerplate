import { cardStyles } from './SelectableCard.styled'
import { Card } from '@qonsoll/react-design'
import { useMemo } from 'react'
import PropTypes from 'prop-types'

/**
 * If the card is selected, use the selected styles, otherwise use the default styles.
 * @param isSelected {boolean} - If true, the card is selected
 * @param onSelect {function} - The function to call when the card is selected
 */
const SelectableCard = (props) => {
  const { isSelected, onSelect, children } = props

  // [COMPUTED_PROPERTIES]
  const styles = useMemo(
    () => (isSelected ? cardStyles.selected : cardStyles.default),
    [isSelected]
  )

  return (
    <Card onClick={onSelect} styles={styles}>
      {children}
    </Card>
  )
}

SelectableCard.propTypes = {
  isSelected: PropTypes.bool,
  onSelect: PropTypes.func,
  children: PropTypes.node
}

export default SelectableCard
