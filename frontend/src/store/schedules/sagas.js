import { take, put, call, fork, select } from 'redux-saga/effects'
import api from 'services/api'
import * as actions from './actions'
import { STORE_TRIP_ID } from '../user/actions'

const url = 'http://127.0.0.1:8000/api/schedules/'
// const tripID = 1
// const token = '703064ee14987e8bf3b6023620042bf8b644d52a'

export function* loadSchedules(tripID) {
    console.log('loadSchedules')
    console.log(tripID)
    var tripScheduleUrl = url + 'trip/' + tripID + '/'
    console.log(tripScheduleUrl)
    
    var tripSchedules
    yield fetch(tripScheduleUrl)
        .then((resp) => resp.json())
        .then(function(data) {
            console.log('schedules for trip')
            tripSchedules = data
            console.log(tripSchedules)
        })
    console.log('tripSchedules')
    console.log(tripSchedules)

    var schedules = tripSchedules
    yield put({ type : 'STORE_SCHEDULE', schedules })
}

export function* postSchedule(contents, since, until) {
    console.log('post in postSchedule')

    const state = yield select()
    var token = state.intro.token
    var tripID = state.user.tripID

    console.log(token)
    console.log(tripID)
    console.log(contents)

    let data
    if (contents != undefined && since != undefined && until != undefined) {
        console.log('**************')
        data = yield call(fetch, url, {
            method: 'POST',
            body: JSON.stringify({ contents: contents, sinceWhen: since, tilWhen: until, tripID: tripID }),
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json'
            }
        })
        console.log('---------------------------')
    }
    
    console.log('before loadSchedules')
    yield call(loadSchedules, tripID)
}

export function* watchPostScheduleRequest() {
    while (true) {
        console.log('postschedule in watch')
        const { contents, since, until } = yield take(actions.POST_SCHEDULE_REQUEST)
        console.log(contents)
        console.log(since)
        console.log(until)
        yield call(postSchedule, contents, since, until)
        console.log('post in watch end')
    }
}

export default function* () {
    const { tripID } = yield take(STORE_TRIP_ID) 
    yield call(loadSchedules, tripID)
    console.log('watchPostScheduleRequest')
    yield fork(watchPostScheduleRequest)
}
