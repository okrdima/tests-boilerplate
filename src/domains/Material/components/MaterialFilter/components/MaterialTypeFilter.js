import { Checkbox } from 'antd'
import PropTypes from 'prop-types'
import { useGetMaterialTypes } from 'domains/MaterialType/hooks'
import { useSubfilterActions } from 'hooks'
import { StyledDetails } from '../MaterialFilter.styles'
import { useTranslations } from 'contexts/Translation'
import { Text } from '@qonsoll/react-design'

const MaterialTypeFilter = ({ filterData, setFilterData }) => {
  // [ADDITIONAL_HOOKS]
  const [materialTypes] = useGetMaterialTypes()
  const { t } = useTranslations()

  // [COMPUTED_PROPERTIES]
  const summaryStyles = { marginBottom: '8px' }

  const { onToggleDetails, onChange, checkIsEnabled } = useSubfilterActions({
    filterData,
    setFilterData,
    fieldName: 'materialType',
    operand: '=='
  })

  return (
    <StyledDetails
      open={
        localStorage.getItem(`materialType-details-visibility`) === 'opened'
      }>
      <summary
        style={summaryStyles}
        onClick={() => onToggleDetails('materialType')}>
        {t('Material type')}
      </summary>
      {materialTypes?.map((materialType, index) => (
        <div key={`status-${index}`}>
          <Checkbox
            key={`status-${index}`}
            checked={checkIsEnabled(materialType)}
            onChange={() => onChange(materialType)}>
            <Text wordBreak="break-all">
              {materialType?.name || t('Unnamed filter')}
            </Text>
          </Checkbox>
        </div>
      ))}
    </StyledDetails>
  )
}

MaterialTypeFilter.propTypes = {
  filterData: PropTypes.object,
  setFilterData: PropTypes.func
}

export default MaterialTypeFilter
