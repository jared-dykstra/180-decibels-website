import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import { Route, Switch } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'
import 'bootstrap'

import './styles/custom.scss'

import createStore from './redux/createStore'
import { HelpMe, HelpMyTeam, Home, NotFound } from './pages'
import {
  ROUTE_HOME,
  ROUTE_HELP_ME,
  ROUTE_HELP_MY_TEAM
} from './redux/routes/routesConstants'
import * as serviceWorker from './serviceWorker'

const history = createBrowserHistory()
const store = createStore(history)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Switch>
          <Route exact path={ROUTE_HOME} render={() => <Home />} />
          <Route exact path={ROUTE_HELP_ME} render={() => <HelpMe />} />
          <Route
            exact
            path={ROUTE_HELP_MY_TEAM}
            render={() => <HelpMyTeam />}
          />
          <Route render={() => <NotFound />} />
        </Switch>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
