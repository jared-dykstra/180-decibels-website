import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import { Route, Switch } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'
import 'bootstrap'

import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import createStore from './redux/createStore'
import { HelpMe, HelpMyTeam, Home, NotFound } from './pages'
import * as serviceWorker from './serviceWorker'

const history = createBrowserHistory()
const store = createStore(history)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/help-me" render={() => <HelpMe />} />
          <Route exact path="/help-my-team" render={() => <HelpMyTeam />} />
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
