import { useTranslations } from 'contexts/Translation'
import PropTypes from 'prop-types'
import { Title, Button } from '@qonsoll/react-design'
import { MAX_LENGTH_FIELD, MAX_LENGTH_DESCRIPTION, KEYS } from '__constants__'
import { Form, Input } from 'antd'

const MaterialSimpleForm = (props) => {
  const { initialValues, onSubmit, onCancel, showTitle, form, group } = props

  // [ADDITIONAL_HOOKS]
  const { t } = useTranslations()
  const [baseForm] = Form.useForm()

  // [COMPUTED_PROPERTIES]
  const usedForm = form || baseForm

  // [HANDLERS]
  const handleCancel = () => {
    usedForm.resetFields()
    onCancel?.()
  }
  const handleKeyPress = (e) => {
    if (e.key === KEYS.ENTER) {
      e.preventDefault()
      e.stopPropagation()
      usedForm?.submit()
    }
  }

  return group ? (
    <>
      {showTitle && (
        <Title level={4} mb={2}>
          {t('Material')}
        </Title>
      )}
      <Form.Item
        label={t('Url')}
        name={[...group, 'url']}
        rules={[
          {
            required: false,
            message: t('Please enter your material url!')
          },
          { max: MAX_LENGTH_FIELD, message: t('material url is too long!') }
        ]}>
        <Input
          placeholder={t('Please enter your material url')}
          onPressEnter={onSubmit}
        />
      </Form.Item>
    </>
  ) : (
    <Form
      form={usedForm}
      initialValues={initialValues}
      onFinish={onSubmit}
      layout="vertical"
      onKeyPress={handleKeyPress}
      autoComplete="off">
      {showTitle && (
        <Title level={4} mb={2}>
          {t('Material')}
        </Title>
      )}
      <Form.Item
        label={t('Url')}
        name="url"
        rules={[
          {
            required: false,
            message: t('Please enter your material url!')
          },
          { max: MAX_LENGTH_FIELD, message: t('material url is too long!') }
        ]}>
        <Input placeholder={t('Please enter your material url')} />
      </Form.Item>
      {!form && (
        <>
          <Button mr={2} htmlType="button" onClick={handleCancel}>
            {t('Cancel')}
          </Button>
          <Button type="primary" onClick={() => usedForm.submit()}>
            {t('Save')}
          </Button>
        </>
      )}
    </Form>
  )
}

MaterialSimpleForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  showTitle: PropTypes.bool,
  form: PropTypes.any,
  group: PropTypes.array
}

export default MaterialSimpleForm
