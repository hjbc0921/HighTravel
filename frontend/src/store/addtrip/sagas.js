import { take, call, fork, select, put} from 'redux-saga/effects'
import api from 'services/api'
import * as actions from './actions'
const url = 'http://127.0.0.1:8000/api/trips/'
import STORE_TRIP from './../user/actions'

export function* postTrip(title, sinceWhen, untilWhen) {
    
    var token = sessionStorage.getItem('token')
    var mytrips = JSON.parse(sessionStorage.getItem('mytrips'))
    console.log("sagaADDTRIP@@@@@@@",token,mytrips)
    let data;
    if (title != undefined && sinceWhen != undefined && untilWhen != undefined) {
        data = yield call(fetch, url, {
            method: 'POST',
            body: JSON.stringify({ title: title, sinceWhen: sinceWhen, tilWhen: untilWhen }),
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json;'
            }
        })
        console.log('addtripsaga---------------------------')
    }
    if (!data.ok){
        yield put(actions.addtripFail("Check the date"))
    }
    else{
        let body = yield call([data, data.json])
        console.log(body)
        var tripJson = {id:body.id, title:body.title}
        console.log('addtripsaga@@@@@@@@@@@@@@@@@@',mytrips)
        console.log('addtripsaga@@@@@@@@@@@@@@@@@@',tripJson)
        mytrips.push(tripJson)
        
        console.log('addtripsaga@@@@@@@@@@@@@@@@@@',mytrips)
        yield put({ type : 'STORE_TRIP', mytrips });
    }
}

export function* watchPostTripRequest() {
    while (true) {
        console.log('post in watch')
        const { title, sinceWhen, untilWhen } = yield take(actions.ADDTRIP_REQUEST)
        console.log(title)
        console.log(sinceWhen)
        console.log(untilWhen)
        yield call(postTrip, title, sinceWhen, untilWhen)
        console.log('post in watch end')
    }
}

export default function* () {
    console.log('watchPostTripRequest')
    yield fork(watchPostTripRequest)
}
