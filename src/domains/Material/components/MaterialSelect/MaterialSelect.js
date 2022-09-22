import {
  Container,
  Row,
  Col,
  Select,
  Option,
  Title
} from '@qonsoll/react-design'
import PropTypes from 'prop-types'
import { useTranslations } from 'contexts/Translation'
import { useGetMaterials } from 'domains/Material/hooks'
import { getId } from 'services/api/rest'
import { useMemo } from 'react'
import _ from 'lodash'

// Takes a value of type object and onChange function
// Returns selected option object
const MaterialSelect = (props) => {
  const {
    value,
    onChange,
    showTitle = true,
    allowClear = true,
    exclude = [],
    ...rest
  } = props

  // [ADDITIONAL_HOOKS]
  const { t } = useTranslations()
  const [allMaterials = [], loading] = useGetMaterials({ orderBy: 'url' })

  // [COMPUTED_PROPERTIES]
  // Handling case when db record not added yet but value already exists and ready to be used
  const valueComputed = useMemo(
    () =>
      value ? { ...(value || []), _id: value._id || getId('Materials') } : null,
    [value]
  )
  const optionsComputed = useMemo(() => {
    const _options = valueComputed
      ? _.uniqBy([...allMaterials, valueComputed], '_id')
      : allMaterials
    const filteredOptions = _options.filter((o) => !exclude.includes(o._id))
    return filteredOptions
  }, [allMaterials, valueComputed, exclude])

  // [HANDLERS]
  const handleChange = (_id) => {
    const selected = optionsComputed.find(({ _id: id }) => id === _id)
    onChange?.(selected || null)
  }

  return (
    <Container my={4} {...rest}>
      {showTitle && (
        <Title mb={2} level={4}>
          {t('Material')}
        </Title>
      )}
      <Row noGutters>
        <Col>
          <Select
            allowClear={allowClear}
            loading={loading}
            placeholder={t('Please, select material')}
            value={valueComputed?._id}
            onChange={handleChange}>
            {optionsComputed.map((material) => (
              <Option key={material?._id} value={material?._id}>
                {material?.url}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
    </Container>
  )
}

MaterialSelect.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
  showTitle: PropTypes.bool,
  allowClear: PropTypes.bool,
  exclude: PropTypes.array
}

export default MaterialSelect
