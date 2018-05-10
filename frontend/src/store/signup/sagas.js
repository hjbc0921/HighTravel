import { take, put, call, fork, select } from 'redux-saga/effects'
import api from 'services/api'
import * as actions from './actions'

const url = 'http://127.0.0.1:8000/accounts/signup/'

function getCSRFToken() {
    var cookieValue = null;
    if (document.cookie && document.cookie != ''){
        var cookies = document.cookie.split(';');
        console.log(cookies)
        for (var i=0;i<cookies.length;i++){
            var cookie = cookies[i];
            if (cookie.substring(0,10) == ('csrftoken'+'=')) {
                cookieValue = decodeURIComponent(cookie.substring(10));
                break;
            }
        }
    }
    return cookieValue;
}

export function* signUp(username, password) {
    console.log('post in postRule')
    console.log(username)
    console.log(password)
    let csrftoken = getCSRFToken()
    console.log(csrftoken)
    let data;
    if (username != undefined && password != undefined) {
        console.log('**************')
        data = yield call(fetch, url, {
            method: 'POST',
            body: JSON.stringify({ username: username, password1: password, password2: password }),
            headers: {
            'Content-Type': 'application/json;',
            'Cookie' : 'csrftoken='+csrftoken,
            'X-CSRFToken' : csrftoken,
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
