import { useTranslations } from 'contexts/Translation'
import PropTypes from 'prop-types'
import { Title, Button } from '@qonsoll/react-design'
import {
  StyledFilter,
  StyledHeader,
  filterBackground,
  filterMaxHeight,
  iconStyles,
  buttonProps
} from './MaterialFilter.styles'
import { CloseOutlined } from '@ant-design/icons'
import { KeywordFilter, CategoryFilter, MaterialTypeFilter } from './components'

const MaterialFilter = (props) => {
  const { filterVisibility, setFilterVisibility, filterData, setFilterData } =
    props

  // [ADDITIONAL_HOOKS]
  const { t } = useTranslations()

  // [HANDLERS]
  const handleClose = () => setFilterVisibility(false)

  return filterVisibility ? (
    <>
      <StyledHeader background={filterBackground}>
        <Title mb={2} level={4}>
          {t('Filter')}
        </Title>
        <Button
          {...buttonProps}
          onClick={handleClose}
          icon={<CloseOutlined style={iconStyles} />}
        />
      </StyledHeader>
      <StyledFilter maxHeight={filterMaxHeight} background={filterBackground}>
        <KeywordFilter filterData={filterData} setFilterData={setFilterData} />
        <CategoryFilter filterData={filterData} setFilterData={setFilterData} />
        <MaterialTypeFilter
          filterData={filterData}
          setFilterData={setFilterData}
        />
      </StyledFilter>
    </>
  ) : null
}

MaterialFilter.propTypes = {
  filterVisibility: PropTypes.bool,
  setFilterVisibility: PropTypes.func,
  filterData: PropTypes.object,
  setFilterData: PropTypes.func
}

export default MaterialFilter
