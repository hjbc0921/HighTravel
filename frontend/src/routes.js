import React from 'react';
import { IndexRoute, Route, browserHistory } from 'react-router';
import { Home, User, Intro, Signup, None} from './components/pages'

function requireAuth(nextState, replace) {
  if (sessionStorage.getItem('token')==="null" || sessionStorage.getItem('token')===null) {
    replace({
      pathname: '/intro',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

const routes = (
    <Route history={browserHistory}>
    <div>
      <Route path="/" component={Home} onEnter={requireAuth} />
      <Route path="/user" component={User} onEnter={requireAuth}/>
      <Route path="/signup" component={Signup} />
      <Route path="/intro" component={Intro} />       
      <Route path="/test" component={None} />
    </div>
  </Route>
)

export default routes
