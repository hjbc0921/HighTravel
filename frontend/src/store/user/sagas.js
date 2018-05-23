import { take, put, call, fork, select } from 'redux-saga/effects'
import api from 'services/api'
import * as actions from './actions'
import { USER_INFO_RECEIVED } from '../intro/actions'
import { ADDTRIP_SUCCESS } from '../addtrip/actions'
import {push} from 'redux-saga'
const url = 'http://127.0.0.1:8000/api/trips/'

export function* loadTrips(userId) {
    
    var trips;
    var mytrips = [];
    var t, u
    var users

    // get all trips and filter user own trip
    try {
    yield fetch(url)
        .then((resp) => resp.json())
        .then(function(data) {
              for (var i=0; i<data.length; i++) {
                t = data[i]
                users = t.users
                  for (var j=0; j<users.length; j++) {
                    u = users[j]
                    if (u.id === userId){
                        mytrips.push({id:t.id,title:t.title})
                    }
                }
            }
        })
    } catch (e) {
        console.log('load trip faild')
    }

    yield put({ type : 'STORE_TRIP', mytrips});
}

export function* watchLogin () {
    while (true) {
        const {userId} = yield take(USER_INFO_RECEIVED)
        yield call(loadTrips,userId)
    }
}

export default function* () {
    yield fork(watchLogin)
}
