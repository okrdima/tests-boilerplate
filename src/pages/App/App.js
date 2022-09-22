import { Redirect, Route, Switch } from 'react-router-dom'

import { BoilerplateLayout } from 'components'
import PATHS from '../paths'
import routes from './routes'

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
