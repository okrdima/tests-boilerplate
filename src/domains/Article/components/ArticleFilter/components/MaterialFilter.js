import { Checkbox } from 'antd'
import PropTypes from 'prop-types'
import { useGetMaterials } from 'domains/Material/hooks'
import { useSubfilterActions } from 'hooks'
import { StyledDetails } from '../ArticleFilter.styles'
import { useTranslations } from 'contexts/Translation'
import { Text } from '@qonsoll/react-design'

const MaterialFilter = ({ filterData, setFilterData }) => {
  // [ADDITIONAL_HOOKS]
  const [materials] = useGetMaterials()
  const { t } = useTranslations()

  // [COMPUTED_PROPERTIES]
  const summaryStyles = { marginBottom: '8px' }

  const { onToggleDetails, onChange, checkIsEnabled } = useSubfilterActions({
    filterData,
    setFilterData,
    fieldName: 'materials',
    operand: 'array-contains'
  })

  return (
    <StyledDetails
      open={localStorage.getItem(`material-details-visibility`) === 'opened'}>
      <summary
        style={summaryStyles}
        onClick={() => onToggleDetails('material')}>
        {t('Material')}
      </summary>
      {materials?.map((material, index) => (
        <div key={`status-${index}`}>
          <Checkbox
            key={`status-${index}`}
            checked={checkIsEnabled(material)}
            onChange={() => onChange(material)}>
            <Text wordBreak="break-all">
              {material?.url || t('Unnamed filter')}
            </Text>
          </Checkbox>
        </div>
      ))}
    </StyledDetails>
  )
}

MaterialFilter.propTypes = {
  filterData: PropTypes.object,
  setFilterData: PropTypes.func
}

export default MaterialFilter
