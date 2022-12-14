import { useTranslations } from 'contexts/Translation'
import { HeaderBreadcrumbs, Spinner } from 'components'
import { PageWrapper, Row, Col } from '@qonsoll/react-design'
import { useParams, useHistory } from 'react-router-dom'
import { MaterialTypeAdvancedForm } from 'domains/MaterialType/components'
import { useGetMaterialTypeInitialValues } from 'domains/MaterialType/hooks'

const MaterialTypeEdit = (props) => {
  // [ADDITIONAL_HOOKS]
  const { t } = useTranslations()
  const history = useHistory()
  const params = useParams()
  const { materialTypeId } = params
  const [initialValues, loading] =
    useGetMaterialTypeInitialValues(materialTypeId)

  // [COMPONENT_STATE_HOOKS]

  // [COMPUTED_PROPERTIES]
  const headingProps = {
    title: t('Material type edit'),
    titleSize: 3,
    marginBottom: 3,
    textAlign: 'left'
  }

  // [HANDLERS]
  const handleBackButtonClick = () => history.goBack()

  return (
    <PageWrapper
      onBack={handleBackButtonClick}
      breadcrumbs={<HeaderBreadcrumbs />}
      headingProps={headingProps}>
      <Row noGutters>
        {loading ? (
          <Col>
            <Spinner height="70vh" text={t('Material type loading')} />
          </Col>
        ) : (
          <Col cw={[12, 12, 10, 8, 7]}>
            <MaterialTypeAdvancedForm initialData={initialValues} />
          </Col>
        )}
      </Row>
    </PageWrapper>
  )
}

export default MaterialTypeEdit
