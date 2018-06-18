import { take, put, call, fork, select } from 'redux-saga/effects'
import api from 'services/api'
import * as actions from './actions'
import { push } from 'react-router-redux'

const url = 'http://'+ location.host+'/api/addusers/'

export function* signUp(username, password,pwd_check) {
    if (password != pwd_check) yield put(actions.signupFail("pwd_check is different from your password"))
    else{
        let data;
        if (username != undefined && password != undefined) {
            try {data = yield call(api.post, url, {username: username, password: password})
            yield put(actions.signupSuc())
            yield put(push('/intro'))
            }catch(err){
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
