import { take, call, fork, select, put} from 'redux-saga/effects'
import api from 'services/api'
import * as actions from './actions'
const url = 'http://127.0.0.1:8000/api/budgets/'
import { STORE_TRIP_ID } from '../user/actions'

export function* loadBudget() {
    var tripID = sessionStorage.getItem('tripID')
    var tripBudgetUrl = url + 'trip/' + tripID + '/'
    var tripBudgets = []
    
    try {
        yield fetch(tripBudgetUrl)
            .then((resp) => resp.json())
            .then(function(data) {
                console.log('budgets for trip')
                tripBudgets = data
            })
    } catch (e) {
        console.log("load budget failed")
    }


    sessionStorage.setItem('tripBudgets',JSON.stringify(tripBudgets))
}

export function* postBudget(contents,money){
    var token = sessionStorage.getItem('token')
    var tripID = sessionStorage.getItem('tripID')
    var data
    try {
        if (contents != undefined) {
            data = yield call(fetch, url, {
                method: 'POST',
                body: JSON.stringify({ contents: contents, money: money, tripID: tripID }),
                headers: {
                    'Authorization': `token ${token}`,
                    'Content-Type': 'application/json'
                }
            })
        }
    } catch (e) {
        console.log('post budget failed')
    }

    yield call(loadBudget)
}

export function* watchPostRequest () {
    while (true) {
        const {contents,money} = yield take(actions.ADDBUDGET_REQUEST)
        console.log('addbudgetRequest is given')
        yield call(postBudget,contents,money)
    }
}

export function* watchStoreTripId() {
    while (true) {
        const action = yield take(STORE_TRIP_ID)
        yield call(loadBudget)
    }
}

export default function* () {
    yield fork(watchStoreTripId)
    yield fork(watchPostRequest)
    //yield fork(watchPatchRequest)
    //yield fork(watchDeleteRequest)
}
