import { useTranslations } from 'contexts/Translation'
import PropTypes from 'prop-types'
import { ArticleSimpleForm } from 'domains/Article/components'
import { Button, Title } from '@qonsoll/react-design'
import { Form } from 'antd'
import { KEYS } from '__constants__'
import {
  useInitializeArticleAdvancedForm,
  useActionsArticleAdvancedForm
} from './hooks'
import { MaterialListWithCreate } from 'domains/Material/components'

const ArticleAdvancedForm = (props) => {
  const { initialData, group, showTitle } = props

  // [ADDITIONAL_HOOKS]
  const { t } = useTranslations()
  const { form } = useInitializeArticleAdvancedForm(initialData)

  // [HANDLERS]
  const handleKeyPress = (e) => {
    if (e.key === KEYS.ENTER) {
      e.preventDefault()
      onFinish()
    }
  }

  const { loading, onFinish, onReset } = useActionsArticleAdvancedForm({
    initialData,
    form
  })

  return group ? (
    <>
      {showTitle && (
        <Title level={4} mb={2}>
          {t('Article')}
        </Title>
      )}
      <ArticleSimpleForm showTitle={false} group={[...group, 'article']} />
      <Form.Item name={[group, 'materials']}>
        <MaterialListWithCreate />
      </Form.Item>
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
          {t('Article')}
        </Title>
      )}
      <ArticleSimpleForm group={['article']} />
      <Form.Item name={['materials']}>
        <MaterialListWithCreate />
      </Form.Item>
      <Button mr={2} htmlType="button" onClick={onReset} mb={4}>
        {t('Cancel')}
      </Button>
      <Button type="primary" loading={loading} onClick={() => form.submit()}>
        {t('Save')}
      </Button>
    </Form>
  )
}

ArticleAdvancedForm.propTypes = {
  initialData: PropTypes.object,
  group: PropTypes.array,
  showTitle: PropTypes.bool
}

export default ArticleAdvancedForm
