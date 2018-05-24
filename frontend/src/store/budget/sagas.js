import { take, call, fork, select, put} from 'redux-saga/effects'
import api from 'services/api'
import * as actions from './actions'
const url = 'http://127.0.0.1:8000/api/trips/'
import { USER_INFO_RECEIVED } from '../intro/actions'

export function* loadBudget(userId) {
    var tripBudgets = [];
    //replace this fake data with real ones
    tripBudgets.push({id:1,contents:"test1",money:"2000"})
    sessionStorage.setItem('tripBudgets',JSON.stringify(tripBudgets))
}

export function* postBudget(contents,money){
    var tripBudgets = JSON.parse(sessionStorage.getItem('tripBudgets'))
    //replace this fake data with real ones
    var tripJson = {id:2, contents:contents, money:money}
    tripBudgets.push(tripJson)
    sessionStorage.setItem('tripBudgets',JSON.stringify(tripBudgets))
}

export function* watchLogin () {
    while (true) {
        const {userId} = yield take(USER_INFO_RECEIVED)
        yield call(loadBudget,userId)
    }
}

export function* watchPostRequest () {
    while (true) {
        const {contents,money} = yield take(actions.addbudgetRequest)
        yield call(postBudget,contents,money)
    }
}

export default function* () {
    yield fork(watchLogin)
    yield fork(watchPostRequest)
    //yield fork(watchPatchRequest)
    //yield fork(watchDeleteRequest)
}

