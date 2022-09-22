import { useTranslations } from 'contexts/Translation'
import PropTypes from 'prop-types'
import { Row, Col, Text, Button } from '@qonsoll/react-design'
import { ArrowUpOutlined, MinusOutlined } from '@ant-design/icons'
import { useCallback, useMemo } from 'react'

const CategorySortMenu = (props) => {
  const { filteredData, setFilteredData } = props
  const { orderBy } = filteredData || {}

  const { t } = useTranslations()

  const sortKeys = useMemo(
    () => ({
      Name: 'name',
      'Creation Date': '_createdAt'
    }),
    []
  )

  const sortButtonClick = (key) => {
    const [field, direction] = orderBy || []
    const newSortField = sortKeys[key]
    if (field === newSortField) {
      setFilteredData({
        ...filteredData,
        orderBy: [newSortField, direction === 'asc' ? 'desc' : 'asc']
      })
    } else {
      setFilteredData({
        ...filteredData,
        orderBy: [newSortField, 'asc']
      })
    }
  }

  const getSortIcon = useCallback(
    (key) => {
      const field = sortKeys[key]
      const [currentSortField, direction] = orderBy || []

      if (field === currentSortField) {
        return direction === 'asc' ? (
          <ArrowUpOutlined />
        ) : (
          <ArrowUpOutlined rotate={180} />
        )
      } else {
        return <MinusOutlined />
      }
    },
    [orderBy, sortKeys]
  )

  const onClearSort = () => setFilteredData({ ...filteredData, orderBy: null })

  return (
    <>
      <Row>
        <Col pl="0px">
          {Object.keys(sortKeys).map((key, index) => (
            <Row mb="8px" key={index}>
              <Col py="0px">
                <Text>{key}</Text>
              </Col>
              <Col py="0px" cw={1}>
                <Button
                  icon={getSortIcon(key)}
                  size="small"
                  type="text"
                  onClick={() => sortButtonClick(key)}
                />
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
      <Row>
        <Col h="center">
          <Button onClick={() => onClearSort()} size="small">
            {t('Clear sort')}
          </Button>
        </Col>
      </Row>
    </>
  )
}

CategorySortMenu.propTypes = {
  filteredData: PropTypes.object,
  setFilteredData: PropTypes.func
}

export default CategorySortMenu
