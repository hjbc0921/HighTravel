
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
      console.log("LOADDIARY########",diaries)
     yield put({ type : 'STORE_DIARY', diaries})
}

export function* watchStoreDiaryRequest(){
   console.log("15")
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

export default function* (){
  console.log("17")
     yield fork(watchStoreTripID)
     yield fork(watchStoreDiaryRequest)
}
