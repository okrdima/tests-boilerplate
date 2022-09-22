import {
  MaterialsAll,
  MaterialShow,
  MaterialCreate,
  MaterialEdit
} from './Material'
import { KeywordShow, KeywordEdit, KeywordsAll, KeywordCreate } from './Keyword'
import {
  CategoryShow,
  CategoryEdit,
  CategoriesAll,
  CategoryCreate
} from './Category'
import { MaterialTypeShow, MaterialTypeEdit } from './MaterialType'
import { ArticlesAll, ArticleShow, ArticleCreate, ArticleEdit } from './Article'
import Dashboard from './Dashboard/Dashboard'
import PATHS from '../paths'
import Translations from 'modules/admin-module/pages/Translations'
import { UserShow } from './User'
import { Settings } from './Settings'
import { Statistics } from './Statistics'

const {
  DASHBOARD,
  USER_SHOW,
  TRANSLATIONS,
  SETTINGS,
  STATISTICS,
  MATERIALS_ALL,
  MATERIAL_SHOW,
  MATERIAL_CREATE,
  MATERIAL_EDIT,
  KEYWORD_SHOW,
  KEYWORD_EDIT,
  KEYWORDS_ALL,
  KEYWORD_CREATE,
  CATEGORY_SHOW,
  CATEGORY_EDIT,
  CATEGORIES_ALL,
  CATEGORY_CREATE,
  MATERIAL_TYPE_SHOW,
  MATERIAL_TYPE_EDIT,
  ARTICLES_ALL,
  ARTICLE_SHOW,
  ARTICLE_CREATE,
  ARTICLE_EDIT
} = PATHS.AUTHENTICATED

const MAIN_ROUTES = [
  { key: 'DASHBOARD', path: DASHBOARD, component: Dashboard, exact: true },
  { key: 'USER_SHOW', path: USER_SHOW, component: UserShow, exact: true },
  {
    key: 'TRANSLATIONS',
    path: TRANSLATIONS,
    component: Translations,
    exact: true
  },
  {
    key: 'SETTINGS',
    path: SETTINGS,
    component: Settings,
    exact: false
  },
  {
    key: 'STATISTICS',
    path: STATISTICS,
    component: Statistics,
    exact: false
  },
  {
    key: 'MATERIAL_EDIT',
    path: MATERIAL_EDIT,
    component: MaterialEdit,
    exact: true
  },
  {
    key: 'KEYWORD_EDIT',
    path: KEYWORD_EDIT,
    component: KeywordEdit,
    exact: true
  },
  {
    key: 'CATEGORY_EDIT',
    path: CATEGORY_EDIT,
    component: CategoryEdit,
    exact: true
  },
  {
    key: 'MATERIAL_TYPE_EDIT',
    path: MATERIAL_TYPE_EDIT,
    component: MaterialTypeEdit,
    exact: true
  },
  {
    key: 'ARTICLE_EDIT',
    path: ARTICLE_EDIT,
    component: ArticleEdit,
    exact: true
  },
  {
    key: 'MATERIALS_ALL',
    path: MATERIALS_ALL,
    component: MaterialsAll,
    exact: true
  },
  {
    key: 'MATERIAL_SHOW',
    path: MATERIAL_SHOW,
    component: MaterialShow,
    exact: true
  },
  {
    key: 'MATERIAL_CREATE',
    path: MATERIAL_CREATE,
    component: MaterialCreate,
    exact: true
  },
  {
    key: 'KEYWORD_SHOW',
    path: KEYWORD_SHOW,
    component: KeywordShow,
    exact: true
  },
  {
    key: 'KEYWORDS_ALL',
    path: KEYWORDS_ALL,
    component: KeywordsAll,
    exact: true
  },
  {
    key: 'KEYWORD_CREATE',
    path: KEYWORD_CREATE,
    component: KeywordCreate,
    exact: true
  },
  {
    key: 'CATEGORY_SHOW',
    path: CATEGORY_SHOW,
    component: CategoryShow,
    exact: true
  },
  {
    key: 'CATEGORIES_ALL',
    path: CATEGORIES_ALL,
    component: CategoriesAll,
    exact: true
  },
  {
    key: 'CATEGORY_CREATE',
    path: CATEGORY_CREATE,
    component: CategoryCreate,
    exact: true
  },
  {
    key: 'MATERIAL_TYPE_SHOW',
    path: MATERIAL_TYPE_SHOW,
    component: MaterialTypeShow,
    exact: true
  },
  {
    key: 'ARTICLES_ALL',
    path: ARTICLES_ALL,
    component: ArticlesAll,
    exact: true
  },
  {
    key: 'ARTICLE_SHOW',
    path: ARTICLE_SHOW,
    component: ArticleShow,
    exact: true
  },
  {
    key: 'ARTICLE_CREATE',
    path: ARTICLE_CREATE,
    component: ArticleCreate,
    exact: true
  }
]

const SETTINGS_ROUTES = []

const STATISTICS_ROUTES = []

export { MAIN_ROUTES, SETTINGS_ROUTES, STATISTICS_ROUTES }
export default MAIN_ROUTES
