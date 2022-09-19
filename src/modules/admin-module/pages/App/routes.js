import PATHS from '../paths'
import { Automatization, Permissions } from './index'
import Translations from '../Translations'

const { AUTOMATIZATION, TRANSLATIONS, PERMISSIONS } = PATHS.AUTHENTICATED

const routes = [
  {
    key: 'AUTOMATIZATION',
    path: AUTOMATIZATION,
    component: Automatization,
    exact: false
  },
  {
    key: 'TRANSLATIONS',
    path: TRANSLATIONS,
    component: Translations,
    exact: true
  },
  {
    key: 'PERMISSIONS',
    path: PERMISSIONS,
    component: Permissions,
    exact: false
  }
]

export default routes
