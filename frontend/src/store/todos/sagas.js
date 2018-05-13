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
    console.log(tripTodoUrl)
    
    var tripTodos
    yield fetch(tripTodoUrl)
        .then((resp) => resp.json())
        .then(function(data) {
            console.log('todos for trip')
            tripTodos = data
            console.log(tripTodos)
        })

    yield put({ type : 'STORE_TODO', tripTodos })

}

export function* postTodo(contents) {
    console.log('post in postRule')

    const state = yield select()
    var token = state.intro.token
    var tripID = state.user.tripID

    console.log('**************')

    let data
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

export default function* () {
    const { tripID } = yield take(STORE_TRIP_ID) 
    yield call(loadTodos, tripID)
    console.log('watchPostTodoRequest')
    yield fork(watchPostTodoRequest)
}
