import { useTranslations } from 'contexts/Translation'
import PropTypes from 'prop-types'
import { MaterialTypeSimpleForm } from 'domains/MaterialType/components'
import { Button, Title } from '@qonsoll/react-design'
import { Form } from 'antd'
import { KEYS } from '__constants__'
import {
  useInitializeMaterialTypeAdvancedForm,
  useActionsMaterialTypeAdvancedForm
} from './hooks'

const MaterialTypeAdvancedForm = (props) => {
  const { initialData, group, showTitle } = props

  // [ADDITIONAL_HOOKS]
  const { t } = useTranslations()
  const { form } = useInitializeMaterialTypeAdvancedForm(initialData)

  // [HANDLERS]
  const handleKeyPress = (e) => {
    if (e.key === KEYS.ENTER) {
      e.preventDefault()
      onFinish()
    }
  }

  const { loading, onFinish, onReset } = useActionsMaterialTypeAdvancedForm({
    initialData,
    form
  })

  return group ? (
    <>
      {showTitle && (
        <Title level={4} mb={2}>
          {t('Material type')}
        </Title>
      )}
      <MaterialTypeSimpleForm
        showTitle={false}
        group={[...group, 'materialType']}
      />
    </>
  ) : (
    <Form
      onKeyPress={handleKeyPress}
      onFinish={onFinish}
      layout="vertical"
      autoComplete="off"
      form={form}>
      {showTitle && (
        <Title level={4} mb={2}>
          {t('Material type')}
        </Title>
      )}
      <MaterialTypeSimpleForm group={['materialType']} />
      <Button mr={2} htmlType="button" onClick={onReset} mb={4}>
        {t('Cancel')}
      </Button>
      <Button type="primary" loading={loading} onClick={() => form.submit()}>
        {t('Save')}
      </Button>
    </Form>
  )
}

MaterialTypeAdvancedForm.propTypes = {
  initialData: PropTypes.object,
  group: PropTypes.array,
  showTitle: PropTypes.bool
}

export default MaterialTypeAdvancedForm
