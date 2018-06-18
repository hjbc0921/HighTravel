import { take, put, call, fork } from 'redux-saga/effects'
import * as actions from './actions'
import { STORE_TRIP_ID } from '../user/actions'

const url = 'http://'+location.host+'/api/markers/'

export function* loadMarker(tripID) {
    var tripMarkerUrl = url + 'trip/' + tripID + '/'
    var tripMarkers = []
    
    try {
        yield fetch(tripMarkerUrl)
            .then((resp) => resp.json())
            .then(function(data) {
                tripMarkers = data
            })
    } catch (e) {
        console.log("load marker failed")
    }
    yield put(actions.loadMarker(tripMarkers))
}

export function* postMarker(lat,lng){
    let token = sessionStorage.getItem('token')
    let tripID = sessionStorage.getItem('tripID')
    let tripMarkers = JSON.parse(sessionStorage.getItem('tripMarkers'))
    let data
    try {
        if (lat !== undefined && lng !== undefined) {
            data = yield call(fetch, url, {
                method: 'POST',
                body: JSON.stringify({ lat : lat, lng : lng , place : " ", tripID : tripID}),
                headers: {
                    'Authorization': `token ${token}`,
                    'Content-Type': 'application/json'
                }
            })
        }
    } catch (e) {
        console.log('post marker failed')
    }
    let body = yield call([data,data.json])
    tripMarkers.push({id:body.id,lat:body.lat,lng:body.lng})
    yield put(actions.loadMarker(tripMarkers))
}

export function* patchMarker(updatedRow) {
    let token = sessionStorage.getItem('token')
    let tripID = sessionStorage.getItem('tripID')
    let markerUrl = url + updatedRow.id + '/'
    let tripMarkers = JSON.parse(sessionStorage.getItem('tripMarkers'))
    let data

    try {
        if (updatedRow != undefined) {
            data = yield call(fetch, markerUrl, {
                method: 'PATCH',
                body: JSON.stringify(updatedRow),
                headers: {
                    'Authorization': `token ${token}`,
                    'Content-Type': 'application/json'
                }
            })
        }
        yield put(actions.patchMarkerSuc())
    } catch (e) {
        console.log('patch marker failed')
        yield put(actions.patchMarkerFail())
    }
    yield call(loadMarker,tripID)
}

export function* deleteEach(markerID) {
    let token = sessionStorage.getItem('token')
    let data
    let markerUrl = url + markerID + '/'
    try {
        if (markerID != undefined) {
        data = yield call(fetch, markerUrl, {
            method: 'DELETE',
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json'
               }
            })
        }
    } catch (e) {
        console.log(e)
        console.log('delete marker failed')
    }
}

export function* deleteMarker(markIDs) {
    var tripID = sessionStorage.getItem('tripID')
    try {
        yield markIDs.map((markerID) => call(deleteEach, markerID))
    } catch(e) {
        console.log('delete marker failed')
    }
    yield call(loadMarker,tripID)
}

export function* watchPostRequest () {
    while (true) {
        const {lat,lng} = yield take(actions.ADD_MARKER)
        yield call(postMarker,lat,lng)
    }
}

export function* watchStoreTripId() {
    while (true) {
        const {tripID} = yield take(STORE_TRIP_ID)
        yield call(loadMarker,tripID)
    }
}

export function* watchPatchRequest() {
    while (true) {
        const {updatedRow} = yield take(actions.PATCH_MARKER)
        yield call(patchMarker,updatedRow)
    }
}

export function* watchDeleteRequest() {
    while (true) {
        const {markIDs} = yield take(actions.DELETE_MARKER_ROWS)
        yield call(deleteMarker,markIDs)
    }
}

export default function* () {
    yield fork(watchStoreTripId)
    yield fork(watchPostRequest)
    yield fork(watchPatchRequest)
    yield fork(watchDeleteRequest)
}
