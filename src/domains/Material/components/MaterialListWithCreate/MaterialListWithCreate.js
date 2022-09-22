import {
  Button,
  Container,
  Divider,
  Title,
  Row,
  Col,
  Box
} from '@qonsoll/react-design'
import { Form, message } from 'antd'
import { useTranslations } from 'contexts/Translation'
import { PlusOutlined } from '@ant-design/icons'
import { useCallback, useMemo, useState } from 'react'
import {
  MaterialList,
  MaterialSimpleForm,
  MaterialSelect
} from 'domains/Material/components'
import PropTypes from 'prop-types'
import useActionsMaterialSimpleForm from 'domains/Material/components/MaterialSimpleForm/hooks/useActionsMaterialSimpleForm'

const MaterialListWithCreate = (props) => {
  const { value, onChange } = props

  // [COMPONENT_STATE_HOOKS]
  const [isAdding, setIsAdding] = useState(false)

  // [ADDITIONAL_HOOKS]
  const [form] = Form.useForm()
  const { t } = useTranslations()
  const { validateForm, prepareValues } = useActionsMaterialSimpleForm()

  // [COMPUTED_PROPERTIES]
  const listMarginBottom = value?.length ? 0 : 4
  const excluded = useMemo(
    () => (value ? value.map(({ _id }) => _id) : []),
    [value]
  )

  // [HANDLERS]
  const toggleAdd = () => setIsAdding((prev) => !prev)
  const handleCancel = () => {
    form.resetFields()
    setIsAdding(false)
  }
  const handleFinish = async (values) => {
    try {
      // Validate fields
      validateForm(values)
      // Prepare values
      const preparedValues = await prepareValues(values)
      // Save values
      onChange?.([...(value || []), preparedValues])
      // Reset form
      toggleAdd()
      form.resetFields()
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
      message.error(error.message)
    }
  }
  const handleDelete = useCallback(
    (elem, index) => {
      onChange?.(value.filter((item, i) => i !== index))
    },
    [value, onChange]
  )
  const handleSave = () => form.submit()
  const handleSelect = (selected) => {
    // Save values
    onChange?.([...(value || []), selected])
    // Reset form
    toggleAdd()
    form.resetFields()
  }

  // [COMPUTED_PROPERTIES]
  const emptyProps = useMemo(
    () => ({
      message: t('No materials have been added yet')
    }),
    [t]
  )
  const actions = useMemo(
    () => ({
      onDelete: handleDelete, // override default handler
      onEdit: null, // override default handler
      onDoubleClick: null // override default handler
    }),
    [handleDelete]
  )

  return (
    <Container>
      <Row noGutters v="center" mb={2}>
        <Col>
          <Title level={4}>{t('Materials')}</Title>
        </Col>
        <Col cw="auto">
          <Button onClick={toggleAdd} icon={<PlusOutlined />}>
            {t('Add')}
          </Button>
        </Col>
      </Row>
      {isAdding ? (
        <Container>
          <MaterialSelect
            showTitle={false}
            my={0}
            onChange={handleSelect}
            exclude={excluded}
          />
          <Divider>{t('or')}</Divider>
          <MaterialSimpleForm onSubmit={handleFinish} form={form} />
          <Box>
            <Button htmlType="button" mr={2} onClick={handleCancel}>
              {t('Cancel')}
            </Button>
            <Button type="primary" onClick={handleSave}>
              {t('Save')}
            </Button>
          </Box>
          <Divider my={4} />
        </Container>
      ) : (
        <Box mb={listMarginBottom}>
          <MaterialList
            isListWithCreate
            actions={actions}
            emptyProps={emptyProps}
            materials={value}
          />
        </Box>
      )}
    </Container>
  )
}

MaterialListWithCreate.propTypes = {
  value: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func
}

export default MaterialListWithCreate
