import { useTranslations } from 'contexts/Translation'
import PropTypes from 'prop-types'
import { CategorySimpleForm } from 'domains/Category/components'
import { Button, Title } from '@qonsoll/react-design'
import { Form } from 'antd'
import { KEYS } from '__constants__'
import {
  useInitializeCategoryAdvancedForm,
  useActionsCategoryAdvancedForm
} from './hooks'

const CategoryAdvancedForm = (props) => {
  const { initialData, group, showTitle } = props

  // [ADDITIONAL_HOOKS]
  const { t } = useTranslations()
  const { form } = useInitializeCategoryAdvancedForm(initialData)

  // [HANDLERS]
  const handleKeyPress = (e) => {
    if (e.key === KEYS.ENTER) {
      e.preventDefault()
      onFinish()
    }
  }

  const { loading, onFinish, onReset } = useActionsCategoryAdvancedForm({
    initialData,
    form
  })

  return group ? (
    <>
      {showTitle && (
        <Title level={4} mb={2}>
          {t('Category')}
        </Title>
      )}
      <CategorySimpleForm showTitle={false} group={[...group, 'category']} />
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
          {t('Category')}
        </Title>
      )}
      <CategorySimpleForm group={['category']} />
      <Button mr={2} htmlType="button" onClick={onReset} mb={4}>
        {t('Cancel')}
      </Button>
      <Button type="primary" loading={loading} onClick={() => form.submit()}>
        {t('Save')}
      </Button>
    </Form>
  )
}

CategoryAdvancedForm.propTypes = {
  initialData: PropTypes.object,
  group: PropTypes.array,
  showTitle: PropTypes.bool
}

export default CategoryAdvancedForm
