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
   diaries.sort(function(a,b) { return (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0);})
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

export function* patchDiary(id, contents) {
    var token = sessionStorage.getItem('token')
    var tripID = sessionStorage.getItem('tripID')
    var diaryUrl = url + id + '/'
    var patchData = {'contents': contents} 
    var data
    try {
        if (id != undefined && contents != undefined) {
            data = yield call(fetch, diaryUrl, {
                method: 'PATCH',
                body: JSON.stringify(patchData),
                headers: {
                    'Authorization': `token ${token}`,
                    'Content-Type': 'application/json'
                }
            })
        }
    } catch (e) {
        console.log('patch expense failed')
    }
    yield call(loadDiaries)
}

export function* watchChangeDiaryRequest() {
    while (true) {
        const {id, contents} = yield take(actions.CHANGE_DIARY_CONTENT)
        yield call(patchDiary,id, contents)
    }
}

export function* deleteDiaries(delUId) {
   var tripID = sessionStorage.getItem('tripID')
   var tripDiaryUrl = url + 'trip/' + tripID + '/'+ 'user/'+ delUId + '/'
  
   var diaries = []
   yield fetch (tripDiaryUrl)
      .then((resp) => resp.json())
      .then(function(data){
         diaries = data
      })
    
    var diaryIDs = diaries.map(d => d.id)
    try {
        yield diaryIDs.map((diaryID) => call(deleteDiary, diaryID))
    } catch(e) {
    }
    
    yield call(loadExpense)
}

export function* watchDeleteUserDiariesRequest() {
    while (true) {
        const {delUId} = yield take(actions.DELETE_USER_DIARIES)
        yield call(deleteDiaries, delUId)
    }
}

export default function* (){
     yield fork(watchStoreTripID)
     yield fork(watchStoreDiaryRequest)
     yield fork(watchDeleteDiaryRequest)
     yield fork(watchChangeDiaryRequest)
     yield fork(watchDeleteUserDiariesRequest)
}
