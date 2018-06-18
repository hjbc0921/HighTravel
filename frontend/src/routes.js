import React from 'react';
import { Switch, IndexRoute, Route, browserHistory } from 'react-router';
import { Home, User, Intro, Signup, None} from './components/pages'
import { message} from 'antd';
message.config({
  top: 400,
  duration: 7,
  maxCount: 3,
})

function requireAuth(nextState, replace) {
  if (sessionStorage.getItem('token')==="null" || sessionStorage.getItem('token')===null) {

   replace({
      pathname: '/intro',
      state: { nextPathname: nextState.location.pathname }
      })
  }
}

function checkAuth(nextState, replace){
  if(sessionStorage.getItem('token')!=="null" && sessionStorage.getItem('token')!==null){
    replace({
      pathname:'/user',
      state : {nextPathname: nextState.location.pathname}
    })
    message.warning('You are already logged in. To switch user, use Logout button.')
  }
}

const routes = (
    <Route history={browserHistory}>
    <div>
      <Route path="/" component={Home} onEnter={requireAuth} />
      <Route path="/user" component={User} onEnter={requireAuth}/>
      <Route path="/signup" component={Signup} />
      <Route path="/intro" component={Intro} onEnter={checkAuth}/>       
      <Route path="*" component={None} />
    </div>
  </Route>
)

export default routes
