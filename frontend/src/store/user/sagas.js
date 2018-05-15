import { take, put, call, fork, select } from 'redux-saga/effects'
import api from 'services/api'
import * as actions from './actions'
import { USER_INFO_RECEIVED } from '../intro/actions'

const url = 'http://127.0.0.1:8000/api/trips/'
// const userID = 1
// const token = '703064ee14987e8bf3b6023620042bf8b644d52a'

export function* loadTrips() {
    console.log('loadTrips')
    //let userID;
    const state = yield select()
    var userID = state.intro.userId
    console.log(userID)
    
    var trips;
    var ownTrip = []
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
                    if (u.id === userID)
                        ownTrip.push({id: t.id, title: t.title})
                }
            }
        })
    } catch (e) {
        console.log('load trip faild')
    }
    console.log(ownTrip)

    yield put({ type : 'STORE_TRIP', ownTrip });

    /*
    const state = yield select()
    console.log(state)
    console.log('************')
    */
}

export default function* () {
    const userID = yield take(USER_INFO_RECEIVED)
    yield call(loadTrips)
}
