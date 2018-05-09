import { take, put, call, fork, select } from 'redux-saga/effects'
import api from 'services/api'
import * as actions from './actions'

const url = 'http://127.0.0.1:8000/accounts/signup/'

export function* signUp(username, password) {
    console.log('post in postRule')
    console.log(username)
    console.log(password)

    let data;
    if (username != undefined && password != undefined) {
        console.log('**************')
        data = yield call(fetch, url, {
            method: 'POST',
            body: JSON.stringify({ username: username, password1: password, password2: password }),
            headers: {
            'Content-Type': 'application/json;'
            }
        })
        console.log('---------------------------')
    }
}

export function* watchSignUpRequest() {
    while (true) {
        console.log('post in watch')
        const { username, password } = yield take(actions.SIGNUP_REQUEST)
        console.log(username)
        console.log(password)
        yield call(signUp, username, password)
        console.log('post in watch end')
    }
}

export default function* () {
    console.log('watchPostRuleRequest')
    yield fork(watchSignUpRequest)
}
