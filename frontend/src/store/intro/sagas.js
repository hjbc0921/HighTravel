import { take, put, call, fork } from 'redux-saga/effects'
import api from 'services/api'
import * as actions from './actions'
import { push } from 'react-router-redux'
const loginUrl = 'http://127.0.0.1:8000/api-token-auth/'
const userUrl = 'http://127.0.0.1:8000/api/users/'

const errMsg = 'Wrong username or wrong password'

export function* login(username, pwd) {
    console.log('post in login')
    let token, response, user, userId
    if (username != undefined && pwd != undefined) {
        console.log('**************')
        try{
        let result = yield call(api.post, loginUrl, { username: username, password: pwd })
        token = result.token
        console.log(token)
        yield fetch(userUrl)
            .then((resp) => resp.json())
            .then(function(data) {
                console.log('user list')
                user = data.find(u => u.username === username)
                userId = user.id
                console.log(userId)
        })
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
        console.log('post in watch')
        const { username, password } = yield take(actions.LOGIN_REQUEST)
        console.log(username)
        console.log(password)
        yield call(login, username, password)
        console.log('post in watch end')
    }
}

export default function* () {
    console.log('watchLoginRequest')
    yield fork(watchLoginRequest)
}
