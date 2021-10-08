import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import { routes } from './routes'

// screens
import { HomeScreen } from '@screens/HomeScreen'

export const AppRouter: React.FC = (props) => {
  const { children } = props
  return (
    <>
      <Router>
        <Switch>
          <Route path={routes.home()}>
            <HomeScreen />
          </Route>
        </Switch>
      </Router>
      {children}
    </>
  )
}
