import { take, put, call, fork, select } from 'redux-saga/effects'
import api from 'services/api'
import * as actions from './actions'
import { push } from 'react-router-redux'

//const url = 'http://127.0.0.1:8000/api/accounts/signup/'
const url = 'http://127.0.0.1:8000/api/addusers/'

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
    //let csrftoken = getCSRFToken()
    //console.log(csrftoken)
    let data;
    if (username != undefined && password != undefined) {
        console.log('**************')
        try {data = yield call(fetch, url, {
            method: 'POST',
            body: JSON.stringify({ username: username, password: password}),
            headers: {
            'Content-Type': 'application/json;',
            }
        })
        yield put(actions.signupSuc())
        yield put(push('/login'))
        }catch(err){
        console.log(err.toString());
        yield put(actions.signupFail(err.toString()))
        }
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
