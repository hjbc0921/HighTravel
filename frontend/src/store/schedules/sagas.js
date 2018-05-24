import { take, put, call, fork, select } from 'redux-saga/effects'
import api from 'services/api'
import * as actions from './actions'
import { STORE_TRIP_ID } from '../user/actions'

const url = 'http://'+location.host+'/api/schedules/'

export function* loadSchedules() {
    var tripID = sessionStorage.getItem('tripID')
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

    var token = sessionStorage.getItem('token')
    var tripID = sessionStorage.getItem('tripID')

    console.log(token)
    console.log(tripID)
    console.log(contents)

    let data
    try {
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
    } catch(e) {
        console.log('postSchedule failed')
    }
    
    console.log('before loadSchedules')
    yield call(loadSchedules)
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

export function* watchStoreTripId() {
    while (true) {
        const action = yield take(STORE_TRIP_ID)
        yield call(loadSchedules)
    }
}

export default function* () {
    yield fork(watchStoreTripId)
    console.log('watchPostScheduleRequest')
    yield fork(watchPostScheduleRequest)
}
