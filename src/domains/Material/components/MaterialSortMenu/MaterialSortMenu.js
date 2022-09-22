import { ArrowUpOutlined, MinusOutlined } from '@ant-design/icons'
import { Button, Col, Row, Text } from '@qonsoll/react-design'
import { useCallback, useMemo } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'contexts/Translation'

const MaterialSortMenu = (props) => {
  const { filteredData, setFilteredData } = props
  const { orderBy } = filteredData | {}

  const { t } = useTranslations()

  const sortKeys = useMemo(
    () => ({
      Url: 'url',
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

MaterialSortMenu.propTypes = {
  filteredData: PropTypes.object,
  setFilteredData: PropTypes.func
}

export default MaterialSortMenu
