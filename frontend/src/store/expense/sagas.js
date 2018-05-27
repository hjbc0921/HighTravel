import { take, call, fork, select, put} from 'redux-saga/effects'
import api from 'services/api'
import * as actions from './actions'
const url = 'http://127.0.0.1:8000/api/expenses/'
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
}

export function* deleteExpense(budIDs) {
    //expense IDs are stored in list
    //fake saga
    var tripBudgets=[{id:1,contents:"after_delete",money:"2000"}]
    yield put(actions.loadBudget(tripBudgets))
    //end of fake saga
}

export function* watchPatchRequest() {
    while (true) {
        const {idUpdatedRow} = yield take(actions.CHANGE_CONTENT)
        yield call(patchExpense,idUpdatedRow)
    }
}

export function* watchDeleteRequest() {
    while (true) {
        const {budIDs} = yield take(actions.DELETE_ROWS)
        yield call(deleteExpense,budIDs)
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
