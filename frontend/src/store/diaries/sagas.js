import { take, put, call, fork, select } from 'redux-saga/effects'
import api from 'services/api'
import * as actions from './actions'
import {STORE_TRIP_ID} from '../user/actions'

const url = 'http://' + location.host + '/api/diaries/'

export function* loadDiaries(){
   var tripID = sessionStorage.getItem('tripID')
   var userID = sessionStorage.getItem('userID')
   var tripDiaryUrl = url + 'trip/' + tripID + '/'+ 'user/'+ userID + '/'
  
   var diaries = []
   yield fetch (tripDiaryUrl)
      .then((resp) => resp.json())
      .then(function(data){
         diaries = data
      })
     yield put({ type : 'STORE_DIARY', diaries})
}

export function* watchStoreDiaryRequest(){
   while(true){
       yield take(actions.STORE_DIARY_REQUEST)
       yield call(loadDiaries)
   }
}

export function* watchStoreTripID(){
  while(true){
       const action = yield take(STORE_TRIP_ID)
       yield call(loadDiaries)
  }
}

export function* deleteDiary(diaryID) {
    var token = sessionStorage.getItem('token')
    var tripID = sessionStorage.getItem('tripID')
    let diaryUrl = url + diaryID + '/'
    let data
    if (diaryID != undefined) {
        data = yield call(fetch, diaryUrl, {
            method: 'DELETE',
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json;'
            }
        })
    }
    yield call(loadDiaries)
}
export function* watchDeleteDiaryRequest() {
    while (true) {
        const {diaryID} = yield take(actions.DELETE_DIARY_REQUEST)
        yield call(deleteDiary,diaryID)
    }
}

export default function* (){
     yield fork(watchStoreTripID)
     yield fork(watchStoreDiaryRequest)
     yield fork(watchDeleteDiaryRequest)
}
