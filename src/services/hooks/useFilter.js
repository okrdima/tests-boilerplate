import { FilterFilled, FilterOutlined } from '@ant-design/icons'

import { useMemo } from 'react'
import { useStateWithStorage } from 'hooks'
import { useTranslations } from 'contexts/Translation'

/**
 * This hook returns an object with the following properties:
 *
 * The filterData object is used to store the filter data. It has the following structure:
 * @param data - The data that will be filtered.
 * @returns An object with the following properties:
 * filterVisibility
 * filterData
 * setFilterData
 * filterButtonText
 * filterButtonIcon
 * onFilterButtonClick
 * showFilter
 */
const useFilter = (domain) => {
  // [ADDITIONAL_HOOKS]
  const { t } = useTranslations()

  // [COMPONENT_STATE_HOOKS]
  const [filterVisibility, setFilterVisibility] = useStateWithStorage(
    false,
    `${domain}FilterVisibility`
  )
  const [filterData, setFilterData] = useStateWithStorage(
    {},
    `${domain}FilterData`
  )

  // [COMPUTED_PROPERTIES]
  const filterButtonText = useMemo(
    () => (filterVisibility ? t('Hide filter') : t('Show filter')),
    [filterVisibility, t]
  )
  const filterButtonIcon = useMemo(
    () => (filterVisibility ? <FilterOutlined /> : <FilterFilled />),
    [filterVisibility]
  )

  // [HANDLERS]
  const onFilterButtonClick = () => setFilterVisibility(!filterVisibility)

  return {
    filterVisibility,
    setFilterVisibility,
    filterData,
    setFilterData,
    filterButtonText,
    filterButtonIcon,
    onFilterButtonClick
  }
}

export default useFilter
