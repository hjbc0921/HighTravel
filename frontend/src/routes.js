import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from 'components/App'
import { Home, Rules } from './components/pages'

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/rules" component={Rules} />
  </Route>
)

export default routes
