import { useTranslations } from 'contexts/Translation'
import { HeaderBreadcrumbs, Spinner } from 'components'
import { PageWrapper, Row, Col } from '@qonsoll/react-design'
import { useParams, useHistory } from 'react-router-dom'
import {
  ArticleList,
  ArticleSortMenu,
  ArticleFilter
} from 'domains/Article/components'
import { useGetArticles } from 'domains/Article/hooks'
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

const ArticlesAll = (props) => {
  // [ADDITIONAL_HOOKS]
  const { t } = useTranslations()
  const history = useHistory()
  const [listView, setListView] = useStateWithStorage(
    false,
    'article-list-view'
  )
  const {
    filterVisibility,
    setFilterVisibility,
    filterButtonText,
    filterButtonIcon,
    onFilterButtonClick,
    filterData,
    setFilterData
  } = useFilter('article-filter')
  const params = useParams()
  const ref = useMemo(() => filterData, [filterData])
  const [articles, loading] = useGetArticles(ref)

  // [COMPONENT_STATE_HOOKS]

  // [COMPUTED_PROPERTIES]
  const headingProps = {
    title: t('Articles'),
    titleSize: 3,
    marginBottom: 3,
    textAlign: 'left'
  }
  const showFilter = useMemo(
    () => Boolean(filterData?.where?.length || articles?.length),
    [filterData?.where, articles]
  )

  // [HANDLERS]
  const handleBackButtonClick = () => history.goBack()

  return (
    <PageWrapper
      action={
        <Box display="flex">
          {showFilter && (
            <Tooltip title={filterButtonText}>
              <Button
                shape="circle"
                type="ghost"
                mr={2}
                onClick={onFilterButtonClick}
                icon={filterButtonIcon}
              />
            </Tooltip>
          )}
          <Tooltip title={t('Open sort menu')}>
            <Popover
              content={
                <ArticleSortMenu
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
            onClick={() => history.push('./article/create')}>
            {t('Add new article')}
          </Button>
        </Box>
      }
      onBack={handleBackButtonClick}
      breadcrumbs={<HeaderBreadcrumbs />}
      headingProps={headingProps}>
      <Row noGutters>
        {showFilter && (
          <Col mr={filterVisibility ? 4 : undefined} cw="auto">
            <ArticleFilter
              filterVisibility={filterVisibility}
              setFilterVisibility={setFilterVisibility}
              filterData={filterData}
              setFilterData={setFilterData}
            />
          </Col>
        )}
        {loading ? (
          <Col>
            <Spinner height="70vh" text={t('Article loading')} />
          </Col>
        ) : (
          <Col>
            <ArticleList listView={listView} articles={articles} />
          </Col>
        )}
      </Row>
    </PageWrapper>
  )
}

export default ArticlesAll
