import { take, put, call, fork, select } from 'redux-saga/effects'
import api from 'services/api'
import * as actions from './actions'

const url = 'http://127.0.0.1:8000/api/trips/'
const userID = 1
const token = 'd741b531943db7d1f456af85105ce666624089b2'

export function* loadTrips() {
    console.log('loadTrips')
    //let userID;
    //tripID = state.userID
    
    var trips;
    var ownTrip = []
    var t, u
    var users

    // get all trips and filter user own trip
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
    console.log(ownTrip)

    yield put({ type : 'STORE_TRIP', ownTrip });

    const state = yield select()
    console.log(state)
    console.log('************')
    console.log(state.rules)
}

export default function* () {
    yield call(loadTrips)
}
