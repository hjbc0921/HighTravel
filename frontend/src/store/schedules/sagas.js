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
            schedules = data
        })
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
    
    yield call(loadSchedules)
}

export function* patchSchedule(idUpdatedRow) {
    var token = sessionStorage.getItem('token')
    var tripID = sessionStorage.getItem('tripID')
    var scheduleUrl = url + idUpdatedRow.realId + '/'
    var tripSchedules = JSON.parse(sessionStorage.getItem('tripSchedules'))
    var valid = idUpdatedRow.sinceWhen <= idUpdatedRow.tilWhen
    var data
    delete idUpdatedRow.id
    delete idUpdatedRow.realId
    try {
        if (idUpdatedRow != undefined && valid) {
            data = yield call(fetch, scheduleUrl, {
                method: 'PATCH',
                body: JSON.stringify(idUpdatedRow),
                headers: {
                    'Authorization': `token ${token}`,
                    'Content-Type': 'application/json'
                }
            })
        }
        yield put(actions.patchscheduleSuc())
    } catch (e) {
        console.log('patch schedule failed', e, data)
        yield put(actions.patchscheduleFail())
    }
    yield call(loadSchedules)
}

export function* watchPostScheduleRequest() {
    while (true) {
        const { contents, since, until } = yield take(actions.POST_SCHEDULE_REQUEST)
        yield call(postSchedule, contents, since, until)
    }
}

export function* watchPatchRequest() {
    while (true) {
        const {idUpdatedRow} = yield take(actions.CHANGE_SCHEDULE_CONTENT)
        yield call(patchSchedule,idUpdatedRow)
    }
}

export function* watchStoreTripId() {
    while (true) {
        const action = yield take(STORE_TRIP_ID)
        yield call(loadSchedules)
    }
}
export function* deleteEach(scheduleID) {
    var token = sessionStorage.getItem('token')
    var scheduleUrl
    var scheduleID
    var data
    scheduleUrl = url + scheduleID + '/'
    try {
        if (scheduleID != undefined) {
        data = yield call(fetch, scheduleUrl, {
            method: 'DELETE',
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json'
               }
            })
        }
    } catch (e) {
        console.log(e)
        console.log('delete schedule failed')
    }
}


export function* deleteSchedule(scheIDs) {
    var tripID = sessionStorage.getItem('tripID')
    try {
        yield scheIDs.map((scheID) => call(deleteEach, scheID))
    } catch(e) {
        console.log('delete schedule failed')
    }
    yield call(loadSchedules)
}

export function* watchDeleteScheduleRequest() {
    while (true) {
        const {scheIDs} = yield take(actions.DELETE_SCHEDULE_REQUEST)
        yield call(deleteSchedule,scheIDs)
    }
}
export default function* () {
    yield fork(watchStoreTripId)
    yield fork(watchPatchRequest)
    yield fork(watchPostScheduleRequest)
    yield fork(watchDeleteScheduleRequest)
}



