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
        //console.log(cookies)
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

export function* signUp(username, password,pwd_check) {
    if (password != pwd_check) yield put(actions.signupFail("pwd_check is different from your password"))
    else{
    //let csrftoken = getCSRFToken()
    //console.log(csrftoken)
        let data;
        if (username != undefined && password != undefined) {
            try {data = yield call(api.post, url, {username: username, password: password})
            yield put(actions.signupSuc())
            yield put(push('/intro'))
            }catch(err){
            console.log(err.toString());
            yield put(actions.signupFail("username already exists"))
            }
        }
    }
}

export function* watchSignUpRequest() {
    while (true) {
        const { username, password, pwd_check } = yield take(actions.SIGNUP_REQUEST)
        yield call(signUp, username, password, pwd_check)
    }
}

export default function* () {
    yield fork(watchSignUpRequest)
}
