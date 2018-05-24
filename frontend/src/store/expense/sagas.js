import { take, call, fork, select, put} from 'redux-saga/effects'
import api from 'services/api'
import * as actions from './actions'
const url = 'http://127.0.0.1:8000/api/expenses/'
import { STORE_TRIP_ID } from '../user/actions'

export function* loadExpense() {
    var tripID = sessionStorage.getItem('tripID')
    var tripExpenseUrl = url + 'trip/' + tripID + '/'
    var tripExpenses = []

    try {
        yield fetch(tripExpenseUrl)
            .then((resp) => resp.json())
            .then(function(data) {
                console.log('expenses for trip')
                tripExpenses = data
            })
    } catch (e) {
        console.log("load expense failed")
    }

    sessionStorage.setItem('tripExpenses',JSON.stringify(tripExpenses))
}

export function* postExpense(contents,date,money){
    var token = sessionStorage.getItem('token')
    var tripID = sessionStorage.getItem('tripID')
    var userID = sessionStorage.getItem('userID')
    var data
    try {
        if (contents != undefined) {
            data = yield call(fetch, url, {
                method: 'POST',
                body: JSON.stringify({ date: date, contents: contents, money: money, spender: userID, tripID: tripID }),
                headers: {
                    'Authorization': `token ${token}`,
                    'Content-Type': 'application/json'
                }
            })
        }
    } catch (e) {
        console.log('post expense failed')
    }

    yield call(loadExpense)
}

export function* watchPostRequest () {
    while (true) {
        const {contents,date,money} = yield take(actions.ADDEXPENSE_REQUEST)
        yield call(postExpense,contents,date,money)
    }
}

export function* watchStoreTripId () {
    while (true) {
        const action = yield take(STORE_TRIP_ID)
        yield call(loadExpense)
    }
}

export default function* () {
    yield fork(watchStoreTripId)
    yield fork(watchPostRequest)
    //yield fork(watchPatchRequest)
    //yield fork(watchDeleteRequest)
}
