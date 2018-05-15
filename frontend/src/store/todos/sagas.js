import { take, put, call, fork, select } from 'redux-saga/effects'
import api from 'services/api'
import * as actions from './actions'
import { STORE_TRIP_ID } from '../user/actions'

const url = 'http://127.0.0.1:8000/api/todos/'
// const tripID = 1
// const token = '703064ee14987e8bf3b6023620042bf8b644d52a'

export function* loadTodos(tripID) {
    console.log('loadTodos')
    console.log(tripID)
    var tripTodoUrl = url + 'trip/' + tripID + '/'
    var tripTodos
    console.log(tripTodoUrl)
    
    try {
        yield fetch(tripTodoUrl)
            .then((resp) => resp.json())
            .then(function(data) {
                console.log('todos for trip')
                tripTodos = data
                console.log(tripTodos)
            })
    } catch(e) {
        console.log('load todo failed')
    }

    yield put({ type : 'STORE_TODO', tripTodos })

}

export function* postTodo(contents) {
    console.log('post in postRule')

    const state = yield select()
    var token = state.intro.token
    var tripID = state.user.tripID
    let data

    console.log('**************')

    try {
        if (contents != undefined) {
            console.log('**************')
            data = yield call(fetch, url, {
                method: 'POST',
                body: JSON.stringify({ contents: contents, tripID: tripID }),
                headers: {
                    'Authorization': `token ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            console.log('---------------------------')
        }
    } catch(e) {
        console.log('post todo failed')
    }
    
    console.log('before loadTodos')
    yield call(loadTodos, tripID)
}

export function* watchPostTodoRequest() {
    while (true) {
        console.log('posttodo in watch')
        const { contents } = yield take(actions.POST_TODO_REQUEST)
        console.log(contents)
        yield call(postTodo, contents)
        console.log('posttodo in watch end')
    }
}

export function* toggleTodo(todoID, done) {
    console.log('patch in toggleRule')

    const state = yield select()
    var token = state.intro.token
    var tripID = state.user.tripID
    var todoUrl = url + todoID + '/'
    let data

    console.log('**************')

    try {
        if (todoID != undefined && done != undefined) {
            console.log('**************')
            data = yield call(fetch, todoUrl, {
                method: 'PATCH',
                body: JSON.stringify({ done: done }),
                headers: {
                    'Authorization': `token ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            console.log('---------------------------')
        }
    } catch(e) {
        console.log('toggle todo failed')
    }
    
    console.log('before loadTodos')
    yield call(loadTodos, tripID)
}

export function* watchToggleTodoRequest() {
    while (true) {
        console.log('toggle todo in watch')
        const { todoID, done } = yield take(actions.TOGGLE_TODO_REQUEST)
        console.log(todoID)
        console.log(done)
        yield call(toggleTodo, todoID, done)
        console.log('toggle todo in watch end')
    }
}

export default function* () {
    const { tripID } = yield take(STORE_TRIP_ID) 
    yield call(loadTodos, tripID)
    console.log('watchPostTodoRequest')
    yield fork(watchPostTodoRequest)
    yield fork(watchToggleTodoRequest)
}
