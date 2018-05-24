import { take, call, fork, select, put} from 'redux-saga/effects'
import api from 'services/api'
import * as actions from './actions'
const url = 'http://127.0.0.1:8000/api/trips/'
import { USER_INFO_RECEIVED } from '../intro/actions'

export function* loadExpense(userId) {
    var tripExpenses = [];
    //replace this fake data with real ones
    tripExpenses.push({id:1,date:"2012-02-02",contents:"test1",money:"2000",spender:"swpp1"})
    sessionStorage.setItem('tripExpenses',JSON.stringify(tripExpenses))
}

export function* postExpense(contents,date,money){
    var tripExpenses = JSON.parse(sessionStorage.getItem('tripExpenses'))
    //replace this fake data with real ones
    var tripJson = {id:2, contents:contents, date:date, spender:"swpp1", money:money}
    tripExpenses.push(tripJson)
    sessionStorage.setItem('tripBudgets',JSON.stringify(tripExpenses))
}

export function* watchLogin () {
    while (true) {
        const {userId} = yield take(USER_INFO_RECEIVED)
        yield call(loadExpense,userId)
    }
}

export function* watchPostRequest () {
    while (true) {
        const {contents,date,money} = yield take(actions.addexpenseRequest)
        yield call(postExpense,contents,date,money)
    }
}

export default function* () {
    yield fork(watchLogin)
    yield fork(watchPostRequest)
    //yield fork(watchPatchRequest)
    //yield fork(watchDeleteRequest)
}

