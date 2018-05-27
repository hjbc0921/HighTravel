import { take, call, fork, select, put} from 'redux-saga/effects'
import api from 'services/api'
import * as actions from './actions'
const url = 'http://127.0.0.1:8000/api/budgets/'
import { STORE_TRIP_ID } from '../user/actions'

export function* loadBudget(tripID) {
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

    yield put(actions.loadBudget(tripBudgets))
}

export function* postBudget(contents,money){
    var token = sessionStorage.getItem('token')
    var tripID = sessionStorage.getItem('tripID')
    var tripBudgets = JSON.parse(sessionStorage.getItem('tripBudgets'))
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
    let body = yield call([data,data.json])
    tripBudgets.push({id:body.id,contents:body.contents,money:body.money})
    yield put(actions.loadBudget(tripBudgets))
}

export function* patchBudget(idUpdatedRow) {
    //idUpdatedRow : {id:2,"contents":"test"} or {id:2,"money":3300}
    //patch and return success or fail to state(state.budget.updated is true when success)
}

export function* deleteBudget(budIDs) {
    console.log(budIDs,"deleteBudget@@@@@@saga")
    //budget IDs are stored in list
    //call loadBudget(tripID) after delete
    //fake saga
    var tripBudgets=[{id:1,contents:"after_delete",money:"2000"}]
    yield put(actions.loadBudget(tripBudgets))
    //end of fake saga
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
        const {tripID} = yield take(STORE_TRIP_ID)
        yield call(loadBudget,tripID)
    }
}

export function* watchPatchRequest() {
    while (true) {
        const {idUpdatedRow} = yield take(actions.CHANGE_CONTENT)
        console.log(idUpdatedRow,"BUDSAGA")
        yield call(patchBudget,idUpdatedRow)
    }
}

export function* watchDeleteRequest() {
    while (true) {
        const {budIDs} = yield take(actions.DELETE_ROWS)
        yield call(deleteBudget,budIDs)
    }
}

export default function* () {
    yield fork(watchStoreTripId)
    yield fork(watchPostRequest)
    yield fork(watchPatchRequest)
    yield fork(watchDeleteRequest)
}
