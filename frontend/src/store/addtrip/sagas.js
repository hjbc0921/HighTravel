import { take, call, fork, select, put} from 'redux-saga/effects'
import api from 'services/api'
import * as actions from './actions'
const url = 'http://'+location.host+'/api/trips/'
import STORE_TRIP from './../user/actions'

export function* postTrip(title, sinceWhen, untilWhen) {
   
    var token = sessionStorage.getItem('token')
    var username = sessionStorage.getItem('username')
    var mytrips = JSON.parse(sessionStorage.getItem('mytrips'))
    var userID = sessionStorage.getItem('userID')
    let data;
    if (title != undefined && sinceWhen != undefined && untilWhen != undefined) {
        data = yield call(fetch, url, {
            method: 'POST',
            body: JSON.stringify({ title: title, sinceWhen: sinceWhen, tilWhen: untilWhen, creator: username }),
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json;'
            }
        })
    }
    if (!data.ok){
        yield put(actions.addtripFail("Check the date"))
    }
    else{
        let body = yield call([data, data.json])
        var tripJson = {id:body.id, title:body.title}
        mytrips.push(tripJson)
        yield put({ type : 'STORE_TRIP', mytrips });
    }
}

export function* watchPostTripRequest() {
    while (true) {
        const { title, sinceWhen, untilWhen } = yield take(actions.ADDTRIP_REQUEST)
        yield call(postTrip, title, sinceWhen, untilWhen)
    }
}

export default function* () {
    yield fork(watchPostTripRequest)
}
