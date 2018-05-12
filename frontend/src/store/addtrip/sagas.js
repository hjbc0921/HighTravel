import { take, call, fork, select, put} from 'redux-saga/effects'
import api from 'services/api'
import * as actions from './actions'
import {push} from 'react-router-redux'

const url = 'http://127.0.0.1:8000/api/trips/'
const token = 'd741b531943db7d1f456af85105ce666624089b2'

export function* postTrip(title, sinceWhen, untilWhen) {
    console.log('post in postTrip')

    //let token;
    //let tripID;
    const state = yield select()
    //token = state.token
    //tripID = state.tripID

    console.log('**************')

    let data;
    if (title != undefined && sinceWhen != undefined && untilWhen != undefined) {
        console.log('**************')
        data = yield call(fetch, url, {
            method: 'POST',
            body: JSON.stringify({ title: title, sinceWhen: sinceWhen, tilWhen: untilWhen }),
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json;'
            }
        })
        console.log('---------------------------')
    }
    if (!data.ok){
        yield put(actions.addtripFail("Check the date"))
    }
    else{
        yield put(push('/user'))
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
