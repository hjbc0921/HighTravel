
import { take, pull, call, fork, select } from 'redux-saga/effects'
import api from 'services/api'
import * as actions from './actions'
import {STORE_TRIP_ID} from '../user/actions'

const url = 'http://' + location.host + '/api/diaries/'

export function* loadDiaries(){
   console.log("11")
   var tripID = sessionStorage.getItem('tripID')
   console.log("12")
   var userID = sessionStorage.getItem('userID')
   var tripDiaryUrl = url + 'trip/' + tripID + '/'+ 'user/'+ userID + '/'
   console.log(tripDiaryUrl)
   console.log("13")
   var diaries = []
   yield fetch (tripDiaryUrl)
      .then((resp) => resp.json())
      .then(function(data){
         diaries = data
      })
     console.log("14")
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
  console.log(sessionStorage.getItem('userID'))
  console.log("16")
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
