import { take, put, call, fork, select, all } from 'redux-saga/effects'
import api from 'services/api'
import * as actions from './actions'
import { USER_INFO_RECEIVED } from '../intro/actions'
import { ADDTRIP_SUCCESS } from '../addtrip/actions'
import { loadBudget } from '../budget/sagas'
import { loadExpense } from '../expense/sagas'
import { loadPhotos } from '../photos/sagas'
import { loadRules } from '../rules/sagas'
import { loadSchedules } from '../schedules/sagas'
import { loadDiaries } from '../diaries/sagas'
import { loadTripInfo, loadUsers } from '../settings/sagas'
import { loadTodos } from '../todos/sagas'
import { loadFolders } from '../addphoto/sagas'
import { loadMarker } from '../addmarker/sagas'
import {push} from 'redux-saga'
const url = 'http://'+location.host+'/api/trips/'

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
                    if (u.id == userId){
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

export function* watchStoreTripId() {
    while (true) {
      const {tripID} = yield take(actions.STORE_TRIP_ID)
      try {
      yield all([
          call(loadSchedules),
          call(loadTripInfo),
          call(loadUsers),
          call(loadPhotos),
          call(loadRules),
          call(loadBudget, tripID),
          call(loadDiaries),
          call(loadFolders),
          call(loadTodos),
          call(loadMarker,tripID)
      ])
      } catch (e) {
        console.log(e)
      }
      yield call(loadExpense) // wait for loadUsers is done
    }
}

export default function* () {
    yield fork(watchLogin)
    yield fork(watchStoreTripId)
}
