import { take, put, call, fork } from 'redux-saga/effects'
import api from 'services/api'
import * as actions from './actions'

const loginUrl = 'http://127.0.0.1:8000/api-token-auth/'
const userUrl = 'http://127.0.0.1:8000/api/users/'

const errMsg = 'Login failed.'

export function* login(uname, pwd) {
    console.log('post in login')

    console.log(uname)
    console.log(pwd)
    let token, response, user, userId
    if (uname != undefined && pwd != undefined) {
        console.log('**************')
        response = yield call(fetch, loginUrl, {
            method: 'POST',
            body: JSON.stringify({ username: uname, password: pwd }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    // login failed
    if (!response.ok)
        yield put({ type: 'LOGIN_FAILED',  errMsg })
    else {
        let result = yield call(api.post, loginUrl, { username: uname, password: pwd })
        token = result.token
        console.log(token)
        yield fetch(userUrl)
            .then((resp) => resp.json())
            .then(function(data) {
                console.log('user list')
                user = data.find(u => u.username === uname)
                userId = user.id
                console.log(userId)
        })
        yield put({ type: 'INTRO_RECEIVED', uname, token, userId })
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
