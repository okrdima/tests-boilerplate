import { useTranslations } from 'contexts/Translation'
import { HeaderBreadcrumbs, Spinner } from 'components'
import { PageWrapper, Row, Col } from '@qonsoll/react-design'
import { useParams, useHistory } from 'react-router-dom'
import { MaterialTypeAdvancedView } from 'domains/MaterialType/components'
import { EditOutlined } from '@ant-design/icons'
import { Button } from '@qonsoll/react-design'

const MaterialTypeShow = (props) => {
  // [ADDITIONAL_HOOKS]
  const { t } = useTranslations()
  const history = useHistory()
  const params = useParams()

  // [COMPONENT_STATE_HOOKS]

  // [COMPUTED_PROPERTIES]
  const headingProps = {
    title: t('Material type show'),
    titleSize: 3,
    marginBottom: 3,
    textAlign: 'left'
  }
  const { materialTypeId } = params

  // [HANDLERS]
  const handleBackButtonClick = () => history.goBack()

  return (
    <PageWrapper
      action={
        <Button
          icon={<EditOutlined />}
          onClick={() =>
            history.push(`/material-types/${materialTypeId}/edit`)
          }>
          {t('Edit')}
        </Button>
      }
      onBack={handleBackButtonClick}
      breadcrumbs={<HeaderBreadcrumbs />}
      headingProps={headingProps}>
      <Row noGutters>
        <Col>
          <MaterialTypeAdvancedView />
        </Col>
      </Row>
    </PageWrapper>
  )
}

export default MaterialTypeShow
