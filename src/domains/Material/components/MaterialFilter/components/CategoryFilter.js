import { Checkbox } from 'antd'
import PropTypes from 'prop-types'
import { useGetCategories } from 'domains/Category/hooks'
import { useSubfilterActions } from 'hooks'
import { StyledDetails } from '../MaterialFilter.styles'
import { useTranslations } from 'contexts/Translation'
import { Text } from '@qonsoll/react-design'

const CategoryFilter = ({ filterData, setFilterData }) => {
  // [ADDITIONAL_HOOKS]
  const [categories] = useGetCategories()
  const { t } = useTranslations()

  // [COMPUTED_PROPERTIES]
  const summaryStyles = { marginBottom: '8px' }

  const { onToggleDetails, onChange, checkIsEnabled } = useSubfilterActions({
    filterData,
    setFilterData,
    fieldName: 'category',
    operand: '=='
  })

  return (
    <StyledDetails
      open={localStorage.getItem(`category-details-visibility`) === 'opened'}>
      <summary
        style={summaryStyles}
        onClick={() => onToggleDetails('category')}>
        {t('Category')}
      </summary>
      {categories?.map((category, index) => (
        <div key={`status-${index}`}>
          <Checkbox
            key={`status-${index}`}
            checked={checkIsEnabled(category)}
            onChange={() => onChange(category)}>
            <Text wordBreak="break-all">
              {category?.name || t('Unnamed filter')}
            </Text>
          </Checkbox>
        </div>
      ))}
    </StyledDetails>
  )
}

CategoryFilter.propTypes = {
  filterData: PropTypes.object,
  setFilterData: PropTypes.func
}

export default CategoryFilter
