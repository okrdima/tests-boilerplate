import { useTranslations } from 'contexts/Translation'
import PropTypes from 'prop-types'
import { Title, Button } from '@qonsoll/react-design'
import { MAX_LENGTH_FIELD, KEYS } from '__constants__'
import { Form, Input } from 'antd'

const KeywordSimpleForm = (props) => {
  const { initialValues, onSubmit, onCancel, showTitle, form, group } = props

  const { t } = useTranslations()
  const [baseForm] = Form.useForm()

  const usedForm = form || baseForm

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
          {t('Keyword')}
        </Title>
      )}
      <Form.Item
        label={t('Name')}
        name={[...group, 'name']}
        rules={[
          {
            required: false,
            message: t('Please enter your keyword name!')
          },
          { max: MAX_LENGTH_FIELD, message: t('keyword name is too long!') }
        ]}>
        <Input
          placeholder={t('Please enter your keyword name')}
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
          {t('Keyword')}
        </Title>
      )}
      <Form.Item
        label={t('Name')}
        name="name"
        rules={[
          {
            required: false,
            message: t('Please enter your keyword name!')
          },
          { max: MAX_LENGTH_FIELD, message: t('keyword name is too long!') }
        ]}>
        <Input placeholder={t('Please enter your keyword name')} />
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

KeywordSimpleForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  showTitle: PropTypes.bool,
  form: PropTypes.any,
  group: PropTypes.array
}

export default KeywordSimpleForm
