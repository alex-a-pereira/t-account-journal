import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import { routes } from './routes'

// screens
import { HomeScreen } from '@screens/HomeScreen'
import { JournalScreen } from '@screens/JournalScreen'
import { FourOhFourScreen } from '@screens/FourOhFourScreen'

interface AppRouterProps {
  HeaderComponent: React.FC
}

export const AppRouter: React.FC<AppRouterProps> = (props: AppRouterProps) => {
  const { HeaderComponent } = props
  return (
    <>
      <Router>
        <HeaderComponent />
        <Switch>
          <Route
            exact
            path={routes.home()}
          >
            <HomeScreen />
          </Route>
          <Route
            exact
            // TODO: better way to do this than array?
            // TODO: type for the saved param.. e.g. IntegerLikeString | 'new'
            path={[
              routes.journal(''), routes.journal(':id')
            ]}
          >
            <JournalScreen />
          </Route>

          <Route path='*'>
            <FourOhFourScreen />
          </Route>
        </Switch>
      </Router>
    </>
  )
}
