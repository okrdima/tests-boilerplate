import { useTranslations } from 'contexts/Translation'
import { HeaderBreadcrumbs, Spinner } from 'components'
import { PageWrapper, Row, Col } from '@qonsoll/react-design'
import { useParams, useHistory } from 'react-router-dom'
import {
  KeywordList,
  KeywordSortMenu,
  KeywordFilter
} from 'domains/Keyword/components'
import { useGetKeywords } from 'domains/Keyword/hooks'
import { Tooltip } from 'antd'
import {
  UnorderedListOutlined,
  SortAscendingOutlined,
  AppstoreOutlined,
  PlusOutlined
} from '@ant-design/icons'
import { useState, useMemo } from 'react'
import { useFilter, useStateWithStorage } from 'hooks'
import { Divider, Box } from '@qonsoll/react-design'
import { Spin, Popover, Button } from '@qonsoll/react-design'

const KeywordsAll = (props) => {
  // [ADDITIONAL_HOOKS]
  const { t } = useTranslations()
  const history = useHistory()
  const [listView, setListView] = useStateWithStorage(
    false,
    'keyword-list-view'
  )
  const {
    filterVisibility,
    setFilterVisibility,
    filterButtonText,
    filterButtonIcon,
    onFilterButtonClick,
    filterData,
    setFilterData
  } = useFilter('keyword-filter')
  const params = useParams()
  const ref = useMemo(() => filterData, [filterData])
  const [keywords, loading] = useGetKeywords(ref)

  // [COMPONENT_STATE_HOOKS]

  // [COMPUTED_PROPERTIES]
  const headingProps = {
    title: t('Keywords'),
    titleSize: 3,
    marginBottom: 3,
    textAlign: 'left'
  }
  const showFilter = useMemo(
    () => Boolean(filterData?.where?.length || keywords?.length),
    [filterData?.where, keywords]
  )

  // [HANDLERS]
  const handleBackButtonClick = () => history.goBack()

  return (
    <PageWrapper
      action={
        <Box display="flex">
          <Tooltip title={t('Open sort menu')}>
            <Popover
              content={
                <KeywordSortMenu
                  filteredData={filterData}
                  setFilteredData={setFilterData}
                />
              }
              trigger="click"
              placement="bottomRight">
              <Button
                shape="circle"
                type="ghost"
                mr={2}
                icon={<SortAscendingOutlined />}
              />
            </Popover>
          </Tooltip>
          <Tooltip title={t('Change list view')} placement="topRight">
            <Button
              shape="circle"
              type="ghost"
              onClick={() => setListView(!listView)}
              icon={listView ? <AppstoreOutlined /> : <UnorderedListOutlined />}
            />
          </Tooltip>
          <Divider mx={3} height="24px" alignSelf="center" type="vertical" />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => history.push('./keyword/create')}>
            {t('Add new keyword')}
          </Button>
        </Box>
      }
      onBack={handleBackButtonClick}
      breadcrumbs={<HeaderBreadcrumbs />}
      headingProps={headingProps}>
      <Row noGutters>
        {loading ? (
          <Col>
            <Spinner height="70vh" text={t('Keyword loading')} />
          </Col>
        ) : (
          <Col>
            <KeywordList listView={listView} keywords={keywords} />
          </Col>
        )}
      </Row>
    </PageWrapper>
  )
}

export default KeywordsAll
