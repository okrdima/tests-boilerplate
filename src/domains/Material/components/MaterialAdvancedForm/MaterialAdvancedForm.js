import { useTranslations } from 'contexts/Translation'
import PropTypes from 'prop-types'
import { MaterialSimpleForm } from 'domains/Material/components'
import { Button, Title } from '@qonsoll/react-design'
import { Form } from 'antd'
import { KEYS } from '__constants__'
import {
  useInitializeMaterialAdvancedForm,
  useActionsMaterialAdvancedForm
} from './hooks'
import { KeywordListWithCreate } from 'domains/Keyword/components'
import { CategorySelectWithCreate } from 'domains/Category/components'
import { MaterialTypeSimpleForm } from 'domains/MaterialType/components'

const MaterialAdvancedForm = (props) => {
  const { initialData, group, showTitle } = props

  // [ADDITIONAL_HOOKS]
  const { t } = useTranslations()
  const { form } = useInitializeMaterialAdvancedForm(initialData)

  // [HANDLERS]
  const handleKeyPress = (e) => {
    if (e.key === KEYS.ENTER) {
      e.preventDefault()
      onFinish()
    }
  }

  const { loading, onFinish, onReset } = useActionsMaterialAdvancedForm({
    initialData,
    form
  })

  return group ? (
    <>
      {showTitle && (
        <Title level={4} mb={2}>
          {t('Material')}
        </Title>
      )}
      <MaterialSimpleForm showTitle={false} group={[...group, 'material']} />
      <Form.Item name={[group, 'keywords']}>
        <KeywordListWithCreate />
      </Form.Item>
      <Form.Item name={[group, 'category']}>
        <CategorySelectWithCreate />
      </Form.Item>
      <MaterialTypeSimpleForm group={[...group, 'materialType']} showTitle />
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
          {t('Material')}
        </Title>
      )}
      <MaterialSimpleForm group={['material']} />
      <Form.Item name={['keywords']}>
        <KeywordListWithCreate />
      </Form.Item>
      <Form.Item name={['category']}>
        <CategorySelectWithCreate />
      </Form.Item>
      <MaterialTypeSimpleForm group={['type']} showTitle />
      <Button mr={2} htmlType="button" onClick={onReset} mb={4}>
        {t('Cancel')}
      </Button>
      <Button type="primary" loading={loading} onClick={() => form.submit()}>
        {t('Save')}
      </Button>
    </Form>
  )
}

MaterialAdvancedForm.propTypes = {
  initialData: PropTypes.object,
  group: PropTypes.array,
  showTitle: PropTypes.bool
}

export default MaterialAdvancedForm
