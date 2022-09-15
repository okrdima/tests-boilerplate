import { Redirect, Route, Switch } from 'react-router-dom'
import { UserEdit, UserShow } from './User'
import { Settings } from './Settings'
import { Statistics } from './Statistics'

import { BoilerplateLayout } from 'components'
import Dashboard from './Dashboard/Dashboard'
import PATHS from '../paths'
import Translations from './Translations'

const { DASHBOARD, USER_EDIT, USER_SHOW, TRANSLATIONS, SETTINGS, STATISTICS } =
  PATHS.AUTHENTICATED

const routes = [
  { key: 'DASHBOARD', path: DASHBOARD, component: Dashboard, exact: true },
  { key: 'USER_SHOW', path: USER_SHOW, component: UserShow, exact: true },
  { key: 'USER_EDIT', path: USER_EDIT, component: UserEdit, exact: true },
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
  }
]

const App = () => {
  return (
    <BoilerplateLayout>
      <Switch>
        {routes.map((routeProps) => (
          <Route key={routeProps.key} {...routeProps} />
        ))}
        <Redirect to={PATHS.SERVICE.NOT_FOUND} />
      </Switch>
    </BoilerplateLayout>
  )
}

export default App
