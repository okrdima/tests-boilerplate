import {
  Container,
  Row,
  Col,
  Title,
  Button,
  Box,
  Divider
} from '@qonsoll/react-design'
import PropTypes from 'prop-types'
import { useTranslations } from 'contexts/Translation'
import { Form, message } from 'antd'
import { CategorySelect, CategorySimpleForm } from 'domains/Category/components'
import { PlusOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { Category } from 'models'
import useActionsCategorySimpleForm from 'domains/Category/components/CategorySimpleForm/hooks/useActionsCategorySimpleForm'

const CategorySelectWithCreate = (props) => {
  const { value, onChange } = props

  // [COMPONENT_STATE_HOOKS]
  const [isEdit, setEdit] = useState(false)

  // [ADDITIONAL_HOOKS]
  const { t } = useTranslations()
  const [form] = Form.useForm()
  const { validateForm, prepareValues } = useActionsCategorySimpleForm()

  // [HANDLERS]
  const toggleEdit = () => setEdit((prev) => !prev)
  const handleFinish = async (values) => {
    try {
      // Validate fields
      validateForm(values)
      // Prepare values
      const preparedValues = await prepareValues(values)
      // Save values
      onChange?.(preparedValues)
      // Reset form
      toggleEdit()
      form.resetFields()
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
      message.error(error.message)
    }
  }

  return (
    <Container>
      <Row noGutters v="center" mb={2}>
        <Col>
          <Title level={4}>{t('Category')}</Title>
        </Col>
        <Col cw="auto">
          <Button onClick={toggleEdit} icon={<PlusOutlined />}>
            {t('Create new')}
          </Button>
        </Col>
      </Row>
      {isEdit ? (
        <>
          <CategorySimpleForm onSubmit={handleFinish} form={form} />
          <Box>
            <Button mr={2} htmlType="button" onClick={toggleEdit}>
              {t('Cancel')}
            </Button>
            <Button type="primary" onClick={() => form.submit()}>
              {t('Save')}
            </Button>
          </Box>
          <Divider my={3} />
        </>
      ) : (
        <CategorySelect
          showTitle={false}
          mb={4}
          my={0}
          value={value}
          onChange={onChange}
        />
      )}
    </Container>
  )
}

CategorySelectWithCreate.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func
}

export default CategorySelectWithCreate
