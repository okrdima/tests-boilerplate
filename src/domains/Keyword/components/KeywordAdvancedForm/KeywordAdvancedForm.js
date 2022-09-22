import { useTranslations } from 'contexts/Translation'
import PropTypes from 'prop-types'
import { KeywordSimpleForm } from 'domains/Keyword/components'
import { Button, Title } from '@qonsoll/react-design'
import { Form } from 'antd'
import { KEYS } from '__constants__'
import {
  useInitializeKeywordAdvancedForm,
  useActionsKeywordAdvancedForm
} from './hooks'

const KeywordAdvancedForm = (props) => {
  const { initialData, group, showTitle } = props

  // [ADDITIONAL_HOOKS]
  const { t } = useTranslations()
  const { form } = useInitializeKeywordAdvancedForm(initialData)

  // [HANDLERS]
  const handleKeyPress = (e) => {
    if (e.key === KEYS.ENTER) {
      e.preventDefault()
      onFinish()
    }
  }

  const { loading, onFinish, onReset } = useActionsKeywordAdvancedForm({
    initialData,
    form
  })

  return group ? (
    <>
      {showTitle && (
        <Title level={4} mb={2}>
          {t('Keyword')}
        </Title>
      )}
      <KeywordSimpleForm showTitle={false} group={[...group, 'keyword']} />
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
          {t('Keyword')}
        </Title>
      )}
      <KeywordSimpleForm group={['keyword']} />
      <Button mr={2} htmlType="button" onClick={onReset} mb={4}>
        {t('Cancel')}
      </Button>
      <Button type="primary" loading={loading} onClick={() => form.submit()}>
        {t('Save')}
      </Button>
    </Form>
  )
}

KeywordAdvancedForm.propTypes = {
  initialData: PropTypes.object,
  group: PropTypes.array,
  showTitle: PropTypes.bool
}

export default KeywordAdvancedForm
