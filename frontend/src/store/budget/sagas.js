import { take, call, fork, select, put} from 'redux-saga/effects'
import api from 'services/api'
import * as actions from './actions'
const url = 'http://'+location.host+'/api/budgets/'

export function* loadBudget(tripID) {
    var tripBudgetUrl = url + 'trip/' + tripID + '/'
    var tripBudgets = []
    
    try {
        yield fetch(tripBudgetUrl)
            .then((resp) => resp.json())
            .then(function(data) {
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
    var budgetUrl = url + idUpdatedRow.realId + '/'
    var tripBudgets = JSON.parse(sessionStorage.getItem('tripBudgets'))
    var data
    delete idUpdatedRow.id
    delete idUpdatedRow.key
    delete idUpdatedRow.realId
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
    var token = sessionStorage.getItem('token')
    var budgetUrl
    var budgetID
    var data
    budgetUrl = url + budgetID + '/'
    try {
        if (budgetID != undefined) {
        data = yield call(fetch, budgetUrl, {
            method: 'DELETE',
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json'
               }
            })
        }
    } catch (e) {
        console.log(e)
        console.log('delete budget failed')
    }
}

export function* deleteBudget(budIDs) {
    var tripID = sessionStorage.getItem('tripID')
    try {
        yield budIDs.map((budgetID) => call(deleteEach, budgetID))
    } catch(e) {
        console.log('delete budget failed')
    }
    yield call(loadBudget,tripID)
}

export function* watchPostRequest () {
    while (true) {
        const {contents,money} = yield take(actions.ADDBUDGET_REQUEST)
        yield call(postBudget,contents,money)
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
    yield fork(watchPostRequest)
    yield fork(watchPatchRequest)
    yield fork(watchDeleteRequest)
}
