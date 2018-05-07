import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from 'components/App'
import { Home, Rules, User, Money, Map, AddTrip, AddPhoto, AddDiary, Photo, Diary, Signup, Intro } from './components/pages'

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <div>
    <Route path="/rules" component={Rules} />
    <Route path="/user" component={User} />
    <Route path="/money" component={Money} />
    <Route path="/map" component={Map} />
    <Route path="/add" component={AddTrip} />
    <Route path="/photo/add" component={AddPhoto} />
    <Route path="/diary/add" component={AddDiary} />
    <Route path="/photo" component={Photo} />
    <Route path="/diary" component={Diary} />
    <Route path="/signup" component={Signup} />
    <Route path="/intro" component={Intro} />
    </div>
  </Route>
)

export default routes
