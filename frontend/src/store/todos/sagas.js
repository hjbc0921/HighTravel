import { take, put, call, fork, select } from 'redux-saga/effects'
import api from 'services/api'
import * as actions from './actions'
import { STORE_TRIP_ID } from '../user/actions'

const url = 'http://'+location.host+'/api/todos/'

export function* loadTodos() {
    var tripID = sessionStorage.getItem('tripID')
    var tripTodoUrl = url + 'trip/' + tripID + '/'
    var tripTodos
    
    try {
        yield fetch(tripTodoUrl)
            .then((resp) => resp.json())
            .then(function(data) {
                tripTodos = data
            })
    } catch(e) {
        console.log('load todo failed')
    }

    yield put({ type : 'STORE_TODO', tripTodos })

}

export function* postTodo(contents) {

    var token = sessionStorage.getItem('token')
    var tripID = sessionStorage.getItem('tripID')
    let data

    try {
        if (contents != undefined) {
            data = yield call(fetch, url, {
                method: 'POST',
                body: JSON.stringify({ contents: contents, tripID: tripID }),
                headers: {
                    'Authorization': `token ${token}`,
                    'Content-Type': 'application/json'
                }
            })
        }
    } catch(e) {
        console.log('post todo failed')
    }
    
    yield call(loadTodos)
}

export function* watchPostTodoRequest() {
    while (true) {
        const { contents } = yield take(actions.POST_TODO_REQUEST)
        yield call(postTodo, contents)
    }
}

export function* toggleTodo(todoID, done) {
    var token = sessionStorage.getItem('token')
    var tripID = sessionStorage.getItem('tripID')
    var todoUrl = url + todoID + '/'
    let data

    try {
        if (todoID != undefined && done != undefined) {
            data = yield call(fetch, todoUrl, {
                method: 'PATCH',
                body: JSON.stringify({ done: done }),
                headers: {
                    'Authorization': `token ${token}`,
                    'Content-Type': 'application/json'
                }
            })
        }
    } catch(e) {
        console.log('toggle todo failed')
    }
    
    yield call(loadTodos)
}

export function* watchToggleTodoRequest() {
    while (true) {
        const { todoID, done } = yield take(actions.TOGGLE_TODO_REQUEST)
        yield call(toggleTodo, todoID, done)
    }
}

export function* deleteTodo(todoID) {
    var token = sessionStorage.getItem('token')
    var tripID = sessionStorage.getItem('tripID')
    let todoUrl = url + todoID + '/'
    let data
    if (todoID != undefined) {
        data = yield call(fetch, todoUrl, {
            method: 'DELETE',
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json;'
            }
        })
    }
    
    yield call(loadTodos)
}

export function* watchDeleteTodoRequest() {
    while (true) {
        const { todoID } = yield take(actions.DELETE_TODO_REQUEST)
        yield call(deleteTodo, todoID)
    }
}

export function* watchStoreTripId() {
    while (true) {
        const action = yield take(STORE_TRIP_ID)
        yield call(loadTodos)
    }
}

export default function* () {
    yield fork(watchStoreTripId)
    yield fork(watchPostTodoRequest)
    yield fork(watchToggleTodoRequest)
    yield fork(watchDeleteTodoRequest)
}
