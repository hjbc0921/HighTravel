import { take, call, fork, select, put} from 'redux-saga/effects'
import api from 'services/api'
import * as actions from './actions'
import { STORE_TRIP_ID } from '../user/actions'
import { ADDUSER_REQUEST, DELETE_USER_REQUEST } from '../settings/actions'

const url = 'http://'+location.host+'/api/expenses/'
const delay = (ms) => new Promise(res => setTimeout(res, ms))

export function* loadExpense() {
    yield delay(300)
    var tripID = sessionStorage.getItem('tripID')
    var tripExpenseUrl = url + 'trip/' + tripID + '/'
    var tripExpenses = []

    try {
        yield fetch(tripExpenseUrl)
            .then((resp) => resp.json())
            .then(function(data) {
                tripExpenses = data
            })
    } catch (e) {
        console.log("load expense failed")
    }

    var users = JSON.parse(sessionStorage.getItem('users'))

    // total expense for each user
    var totalExpenses = {}
    // mapping userID and username
    var userIdName = {}
    var personId, personName
    for (var i=0; i<users.length; i++) {
        personId = users[i].id
    
        personName = users[i].username
        userIdName[personId] = personName
        totalExpenses[personName] = 0
    }

    var spenderId
    var spenderName
    for (var i=0; i<tripExpenses.length; i++) {
        spenderId = tripExpenses[i].spender
        spenderName = userIdName[spenderId]
        tripExpenses[i].spender = spenderName // change spender from id to name
        totalExpenses[spenderName] += tripExpenses[i].money
    }

    sessionStorage.setItem('tripExpenses',JSON.stringify(tripExpenses))
    sessionStorage.setItem('totalExpenses',JSON.stringify(totalExpenses))
    yield put(actions.addexpenseSuc())
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

export function* patchExpense(idUpdatedRow) {
    //idUpdatedRow : {id:2,"contents":"test"} or {id:2,"money":3300}
    //patch and return success or fail to state(state.expense.updated is true when success)
    var token = sessionStorage.getItem('token')
    var tripID = sessionStorage.getItem('tripID')
    var expenseUrl = url + idUpdatedRow.realId + '/'
    var data
    delete idUpdatedRow.id
    delete idUpdatedRow.realId
    delete idUpdatedRow.spender
    try {
        if (idUpdatedRow != undefined) {
            data = yield call(fetch, expenseUrl, {
                method: 'PATCH',
                body: JSON.stringify(idUpdatedRow),
                headers: {
                    'Authorization': `token ${token}`,
                    'Content-Type': 'application/json'
                }
            })
        }
        yield put(actions.patchexpenseSuc())
    } catch (e) {
        console.log('patch expense failed')
        yield put(actions.patchexpenseFail())
    }
    yield call(loadExpense)
}

export function* deleteEach(expenseID) {
    var token = sessionStorage.getItem('token')
    var expenseUrl
    var expenseID
    var data
    expenseUrl = url + expenseID + '/'
    try {
        if (expenseID != undefined) {
        data = yield call(fetch, expenseUrl, {
            method: 'DELETE',
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json'
               }
            })
        }
    } catch (e) {
        console.log(e)
        console.log('delete expense failed')
    }
}

export function* deleteExpense(expIDs) {
    var tripID = sessionStorage.getItem('tripID')
    try {
        yield expIDs.map((expenseID) => call(deleteEach, expenseID))
    } catch(e) {
    }
    
    yield call(loadExpense)
}

export function* watchPatchRequest() {
    while (true) {
        const {idUpdatedRow} = yield take(actions.CHANGE_EXPENSE_CONTENT)
        yield call(patchExpense,idUpdatedRow)
    }
}

export function* watchDeleteRequest() {
    while (true) {
        const {expIDs} = yield take(actions.DELETE_EXPENSE_ROWS)
        yield call(deleteExpense,expIDs)
    }
}

export function* watchPostRequest () {
    while (true) {
        const {contents,date,money} = yield take(actions.ADDEXPENSE_REQUEST)
        yield call(postExpense,contents,date,money)
    }
}

export function* watchStoreTripId () {
    while (true) {
        yield take(STORE_TRIP_ID)
        yield call(loadExpense)
    }
}

export function* watchAddUserRequest () {
    while (true) {
        yield take(ADDUSER_REQUEST)
        yield call(loadExpense)
    }
}

export function* watchDeleteUserRequest () {
    while (true) {
        yield take(DELETE_USER_REQUEST)
        yield call(loadExpense)
    }
}

export default function* () {
    yield fork(watchStoreTripId)
    yield fork(watchPostRequest)
    yield fork(watchPatchRequest)
    yield fork(watchDeleteRequest)
    yield fork(watchAddUserRequest)
    yield fork(watchDeleteUserRequest)
}
