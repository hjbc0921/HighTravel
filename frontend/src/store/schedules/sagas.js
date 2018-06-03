import { take, put, call, fork, select } from 'redux-saga/effects'
import api from 'services/api'
import * as actions from './actions'
import { STORE_TRIP_ID } from '../user/actions'

const url = 'http://'+location.host+'/api/schedules/'

export function* loadSchedules() {
    var tripID = sessionStorage.getItem('tripID')
    var tripScheduleUrl = url + 'trip/' + tripID + '/'
   
    var schedules = []
    yield fetch(tripScheduleUrl)
        .then((resp) => resp.json())
        .then(function(data) {
            console.log('schedules for trip')
            schedules = data
        })
    console.log('loadsche########',schedules)
    yield put({ type : 'STORE_SCHEDULE', schedules })
}

export function* postSchedule(contents, since, until) {
    var token = sessionStorage.getItem('token')
    var tripID = sessionStorage.getItem('tripID')
    let data
    try {
        if (contents != undefined && since != undefined && until != undefined) {
            data = yield call(fetch, url, {
                method: 'POST',
                body: JSON.stringify({ contents: contents, sinceWhen: since, tilWhen: until, tripID: tripID }),
                headers: {
                    'Authorization': `token ${token}`,
                    'Content-Type': 'application/json'
                }
            })
        }
    } catch(e) {
        yield put(actions.postScheduleFail())
    }
    
    console.log('before loadSchedules')
    yield call(loadSchedules)
}

export function* watchPostScheduleRequest() {
    while (true) {
        const { contents, since, until } = yield take(actions.POST_SCHEDULE_REQUEST)
        console.log("POSTSCHE@@@@@@@@@@@",contents)
        console.log(since)
        console.log(until)
        yield call(postSchedule, contents, since, until)
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
    yield fork(watchPostScheduleRequest)
}