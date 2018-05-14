import React from 'react';
import { IndexRoute, Route, browserHistory } from 'react-router';
import { Home, Rules, User, Money, Map, AddTrip, AddPhoto, AddDiary, Photo, Diary, Signup, Intro } from './components/pages'

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
      <Route path="/rules" component={Rules} onEnter={requireAuth}/>
      <Route path="/user" component={User} onEnter={requireAuth}/>
      <Route path="/money" component={Money} onEnter={requireAuth}/>
      <Route path="/map" component={Map} onEnter={requireAuth}/>
      <Route path="/add" component={AddTrip} onEnter={requireAuth}/>
      <Route path="/photo/add" component={AddPhoto} onEnter={requireAuth}/>
      <Route path="/diary/add" component={AddDiary} onEnter={requireAuth}/>
      <Route path="/photo" component={Photo} onEnter={requireAuth}/>
      <Route path="/diary" component={Diary} onEnter={requireAuth}/>
      <Route path="/signup" component={Signup} />
      <Route path="/intro" component={Intro} />       
    </div>
  </Route>
)

export default routes
