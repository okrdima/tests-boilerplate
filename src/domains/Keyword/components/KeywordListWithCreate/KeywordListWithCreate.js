import { Col, Container, Row, Title } from '@qonsoll/react-design'
import PropTypes from 'prop-types'
import { Select } from 'antd'
import { useTranslations } from 'contexts/Translation'
import { useMemo } from 'react'
import { useGetKeywords } from 'domains/Keyword/hooks'
import _ from 'lodash'
import { getId } from 'services/api/rest'

const { Option } = Select

const KeywordListWithCreate = (props) => {
  const { value, onChange } = props

  // [ADDITIONAL_HOOKS]
  const { t } = useTranslations()
  const [allKeywords = []] = useGetKeywords({ orderBy: 'name' })

  // [COMPUTED_PROPS]
  const possibleOptions = useMemo(
    () =>
      value
        ? _.uniqBy([...allKeywords, ...(value || [])], 'name')
        : allKeywords,
    [allKeywords, value]
  )
  const computedValue = useMemo(() => value?.map((item) => item?.name), [value])

  // [HANDLERS]
  const handleChange = (value) => {
    const checkIfArrayContainsItem = (item) => {
      return allKeywords?.some((keyword) => keyword.name === item)
    }

    onChange(
      value.map((item) => {
        return !checkIfArrayContainsItem(item)
          ? { name: item, _id: item._id || getId('keywords') }
          : Array.from(possibleOptions).find(
              (keyword) => keyword?.['name'] === item
            )
      })
    )
  }

  return (
    <Container mb={4}>
      <Title level={4} mb={2}>
        {t('Keywords')}
      </Title>
      <Row>
        <Col px="0px">
          <Select
            onChange={handleChange}
            mode="tags"
            placeholder={t('Enter keywords')}
            value={computedValue}>
            {Array.from(possibleOptions).map((keyword, index) => (
              <Option key={index} value={keyword?.name}>
                {keyword?.name}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
    </Container>
  )
}

KeywordListWithCreate.propTypes = {
  value: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func
}

export default KeywordListWithCreate
