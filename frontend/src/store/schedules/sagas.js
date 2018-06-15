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

export function* patchSchedule(idUpdatedRow) {
    var token = sessionStorage.getItem('token')
    var tripID = sessionStorage.getItem('tripID')
    var scheduleUrl = url + idUpdatedRow.realId + '/'
    var tripSchedules = JSON.parse(sessionStorage.getItem('tripSchedules'))
    var data
    console.log('-------------------', idUpdatedRow)
    delete idUpdatedRow.id
    delete idUpdatedRow.realId
    console.log(idUpdatedRow)
    try {
        if (idUpdatedRow != undefined) {
            data = yield call(fetch, scheduleUrl, {
                method: 'PATCH',
                body: JSON.stringify(idUpdatedRow),
                headers: {
                    'Authorization': `token ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            console.log('-------------PATCH')
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
        console.log("POSTSCHE@@@@@@@@@@@",contents)
        console.log(since)
        console.log(until)
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
    console.log('in delete each')
    var token = sessionStorage.getItem('token')
    var scheduleUrl
    var scheduleID
    var data
    console.log(scheduleID)
    scheduleUrl = url + scheduleID + '/'
    console.log(scheduleUrl)
    try {
        if (scheduleID != undefined) {
        data = yield call(fetch, scheduleUrl, {
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
        console.log('delete schedule failed')
    }
    console.log('delete is done')
}


export function* deleteSchedule(scheIDs) {
    console.log(scheIDs,"deleteSchedule@@@@@@@@@@@@@saga")
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



