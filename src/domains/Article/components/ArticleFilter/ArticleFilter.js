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
} from './ArticleFilter.styles'
import { CloseOutlined } from '@ant-design/icons'
import { MaterialFilter } from './components'

const ArticleFilter = (props) => {
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
        <MaterialFilter filterData={filterData} setFilterData={setFilterData} />
      </StyledFilter>
    </>
  ) : null
}

ArticleFilter.propTypes = {
  filterVisibility: PropTypes.bool,
  setFilterVisibility: PropTypes.func,
  filterData: PropTypes.object,
  setFilterData: PropTypes.func
}

export default ArticleFilter
