import PATHS from '../paths'
import { Automatization, Permissions } from './index'
import Translations from '../Translations'
import { UsersAll } from './User'
// import { RolesAll } from './Role'
// import { ModelsAll } from './Model'
// import { PagesAll } from './Page'

const {
  TRANSLATIONS,
  AUTOMATIZATION,
  PERMISSIONS,
  USERS_LIST
  // ROLES_LIST,
  // MODELS_LIST,
  // PAGES_LIST
} = PATHS.AUTHENTICATED

const MAIN_ROUTES = [
  {
    key: 'TRANSLATIONS',
    path: TRANSLATIONS,
    component: Translations,
    exact: true
  },
  {
    key: 'AUTOMATIZATION',
    path: AUTOMATIZATION,
    component: Automatization,
    exact: false
  },
  {
    key: 'PERMISSIONS',
    path: PERMISSIONS,
    component: Permissions,
    exact: false
  }
]

const AUTOMATIZATION_ROUTES = []

const PERMISSIONS_ROUTES = [
  {
    key: 'USERS_LIST',
    path: USERS_LIST,
    component: UsersAll,
    exact: true
  }
  // {
  //   key: 'ROLES_LIST',
  //   path: ROLES_LIST,
  //   component: RolesAll,
  //   exact: false
  // },
  // {
  //   key: 'MODELS_LIST',
  //   path: MODELS_LIST,
  //   component: ModelsAll,
  //   exact: false
  // },
  // {
  //   key: 'PAGES_LIST',
  //   path: PAGES_LIST,
  //   component: PagesAll,
  //   exact: false
  // }
]

export { MAIN_ROUTES, AUTOMATIZATION_ROUTES, PERMISSIONS_ROUTES }
export default MAIN_ROUTES
