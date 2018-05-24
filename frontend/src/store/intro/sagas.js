import { take, put, call, fork } from 'redux-saga/effects'
import api from 'services/api'
import * as actions from './actions'
import { push } from 'react-router-redux'
const loginUrl = 'http://'+location.host+'/api-token-auth/'
const userUrl = 'http://'+location.host+'/api/users/'

const errMsg = 'Wrong username or wrong password'

export function* login(username, pwd) {
    let token, response, user, userId
    if (username != undefined && pwd != undefined) {
        try{
        let result = yield call(api.post, loginUrl, { username: username, password: pwd })
        token = result.token
        yield fetch(userUrl)
            .then((resp) => resp.json())
            .then(function(data) {
                user = data.find(u => u.username === username)
                userId = user.id
        })
        sessionStorage.setItem('userID', userId)
        sessionStorage.setItem('username',username)
        sessionStorage.setItem('token',token)
        yield put(actions.IntroReceived({username,token,userId}))
        yield put(push('/user'))
        } catch(err){
            console.log("#########loginFail")
            yield put(actions.loginFailed(errMsg))
        }

    }
        
}

export function* watchLoginRequest() {
    while (true) {
        const { username, password } = yield take(actions.LOGIN_REQUEST)
        yield call(login, username, password)
    }
}

export default function* () {
    yield fork(watchLoginRequest)
}
