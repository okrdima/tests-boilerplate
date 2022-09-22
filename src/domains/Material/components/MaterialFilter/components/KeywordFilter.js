import { Checkbox } from 'antd'
import PropTypes from 'prop-types'
import { useGetKeywords } from 'domains/Keyword/hooks'
import { useSubfilterActions } from 'hooks'
import { StyledDetails } from '../MaterialFilter.styles'
import { useTranslations } from 'contexts/Translation'
import { Text } from '@qonsoll/react-design'

const KeywordFilter = ({ filterData, setFilterData }) => {
  // [ADDITIONAL_HOOKS]
  const [keywords] = useGetKeywords()
  const { t } = useTranslations()

  // [COMPUTED_PROPERTIES]
  const summaryStyles = { marginBottom: '8px' }

  const { onToggleDetails, onChange, checkIsEnabled } = useSubfilterActions({
    filterData,
    setFilterData,
    fieldName: 'keywords',
    operand: 'array-contains'
  })

  return (
    <StyledDetails
      open={localStorage.getItem(`keyword-details-visibility`) === 'opened'}>
      <summary style={summaryStyles} onClick={() => onToggleDetails('keyword')}>
        {t('Keyword')}
      </summary>
      {keywords?.map((keyword, index) => (
        <div key={`status-${index}`}>
          <Checkbox
            key={`status-${index}`}
            checked={checkIsEnabled(keyword)}
            onChange={() => onChange(keyword)}>
            <Text wordBreak="break-all">
              {keyword?.name || t('Unnamed filter')}
            </Text>
          </Checkbox>
        </div>
      ))}
    </StyledDetails>
  )
}

KeywordFilter.propTypes = {
  filterData: PropTypes.object,
  setFilterData: PropTypes.func
}

export default KeywordFilter
