import { take, call, fork, select, put} from 'redux-saga/effects'
import api from 'services/api'
import * as actions from './actions'
const url = 'http://'+location.host+'/api/expenses/'
// import { STORE_TRIP_ID } from '../user/actions'
import { STORE_USERS } from '../adduser/actions'

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

    var users = JSON.parse(sessionStorage.getItem('users'))
    console.log(users)

    // total expense for each user
    var totalExpenses = {}
    // mapping userID and username
    var userIdName = {}
    var personId, personName
    for (var i=0; i<users.length; i++) {
        console.log('@@@@@@1@@@@@@@@')
        personId = users[i].id
        console.log('@@@@@@2@@@@@@@@', personId, users[i].name)
        personName = users[i].name
        userIdName[personId] = personName
        totalExpenses[personName] = 0
        console.log('@@@@@@3@@@@@@@@')
    }
    console.log(userIdName)
    console.log(totalExpenses)
    console.log(tripExpenses)

    var spenderId
    var spenderName
    for (var i=0; i<tripExpenses.length; i++) {
        spenderId = tripExpenses[i].spender
        console.log(spenderId)
        spenderName = userIdName[spenderId]
        tripExpenses[i].spender = spenderName // change spender from id to name
        totalExpenses[spenderName] += tripExpenses[i].money
    }

    console.log('totalExpenses', totalExpenses)
    console.log('tripExpenses', tripExpenses)

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
    var expenseUrl = url + idUpdatedRow.id + '/'
    var tripExpenses = JSON.parse(sessionStorage.getItem('tripExpenses'))
    var data
    console.log(idUpdatedRow)
    delete idUpdatedRow.id
    console.log(idUpdatedRow)
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
    yield call(loadExpense,tripID)
}

export function* deleteEach(expenseID) {
    console.log('in delete each')
    var token = sessionStorage.getItem('token')
    var expenseUrl
    var expenseID
    var data
    console.log(expenseID)
    expenseUrl = url + expenseID + '/'
    console.log(expenseUrl)
    try {
        if (expenseID != undefined) {
        data = yield call(fetch, expenseUrl, {
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
        console.log('delete expense failed')
    }
    console.log('delete is done')
}

export function* deleteExpense(expIDs) {
    console.log('deleteExpense', expIDs)
    var tripID = sessionStorage.getItem('tripID')
    console.log('in delete Expense')
    try {
        yield expIDs.map((expenseID) => call(deleteEach, expenseID))
    } catch(e) {
        console.log('delete expense failed')
    }
    yield call(loadExpense, tripID)
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
        console.log('watch Delete Request', expIDs)
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
        const action = yield take(STORE_USERS)
        yield call(loadExpense)
    }
}

export default function* () {
    yield fork(watchStoreTripId)
    yield fork(watchPostRequest)
    yield fork(watchPatchRequest)
    yield fork(watchDeleteRequest)
}
