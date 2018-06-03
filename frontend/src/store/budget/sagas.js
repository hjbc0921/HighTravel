import { take, call, fork, select, put} from 'redux-saga/effects'
import api from 'services/api'
import * as actions from './actions'
const url = 'http://'+location.host+'/api/budgets/'
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
    var token = sessionStorage.getItem('token')
    var tripID = sessionStorage.getItem('tripID')
    var budgetUrl = url + idUpdatedRow.id + '/'
    var tripBudgets = JSON.parse(sessionStorage.getItem('tripBudgets'))
    var data
    console.log(idUpdatedRow)
    delete idUpdatedRow.id
    console.log(idUpdatedRow)
    try {
        if (idUpdatedRow != undefined) {
            data = yield call(fetch, budgetUrl, {
                method: 'PATCH',
                body: JSON.stringify(idUpdatedRow),
                headers: {
                    'Authorization': `token ${token}`,
                    'Content-Type': 'application/json'
                }
            })
        }
        yield put(actions.patchbudgetSuc())
    } catch (e) {
        console.log('patch budget failed')
        yield put(actions.patchbudgetFail())
    }
    yield call(loadBudget,tripID)
}

export function* deleteEach(budgetID) {
    console.log('in delete each')
    var token = sessionStorage.getItem('token')
    var budgetUrl
    var budgetID
    var data
    console.log(budgetID)
    budgetUrl = url + budgetID + '/'
    console.log(budgetUrl)
    try {
        if (budgetID != undefined) {
        data = yield call(fetch, budgetUrl, {
            method: 'DELETE',
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json'
               }
            })
        console.log('data', data)
        }
    } catch (e) {
        console.log(e)
        console.log('delete budget failed')
    }
    console.log('delete is done')
}

export function* deleteBudget(budIDs) {
    console.log(budIDs,"deleteBudget@@@@@@saga")
    var tripID = sessionStorage.getItem('tripID')
    /*
    for (var i=0; i<budIDs.length; i++) {
        console.log('before deleteEach')
        yield call(deleteEach, budIDs[i])
        console.log('after deleteEach', budIDs[i])
    }
    */
    //budget IDs are stored in list
    //call loadBudget(tripID) after delete
    try {
        yield budIDs.map((budgetID) => call(deleteEach, budgetID))
    } catch(e) {
        console.log('delete budget failed')
    }
    /*
    yield all(budIDs.map(function(budgetID) {
        console.log('in deleteBudget', budgetID)
        call(deleteEach, budgetID);
        console.log('end delete')}))
    console.log('before load budget')
    var tripID = sessionStorage.getItem('tripID')
    yield call(loadBudget,tripID)
    */
    yield call(loadBudget,tripID)
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
        const {idUpdatedRow} = yield take(actions.CHANGE_BUDGET_CONTENT)
        yield call(patchBudget,idUpdatedRow)
    }
}

export function* watchDeleteRequest() {
    while (true) {
        const {budIDs} = yield take(actions.DELETE_BUDGET_ROWS)
        yield call(deleteBudget,budIDs)
    }
}

export default function* () {
    yield fork(watchStoreTripId)
    yield fork(watchPostRequest)
    yield fork(watchPatchRequest)
    yield fork(watchDeleteRequest)
}
