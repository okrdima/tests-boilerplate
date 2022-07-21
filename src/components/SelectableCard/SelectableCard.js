import { cardStyles } from './SelectableCard.styled'
import { Card } from '@qonsoll/react-design'
import { useMemo } from 'react'
import PropTypes from 'prop-types'

const SelectableCard = (props) => {
  const { isSelected, children } = props

  // [COMPUTED_PROPERTIES]
  const styles = useMemo(
    () => (isSelected ? cardStyles.selected : cardStyles.default),
    [isSelected]
  )

  return <Card styles={styles}>{children}</Card>
}

SelectableCard.propTypes = {
  isSelected: PropTypes.bool,
  children: PropTypes.node
}

export default SelectableCard
