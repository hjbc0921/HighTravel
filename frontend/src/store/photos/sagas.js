import { take, put, call, fork, select } from 'redux-saga/effects'
import api from 'services/api'
import * as actions from './actions'
import {STORE_TRIP_ID} from '../user/actions'

const url = 'http://' + location.host +'/api/photos/'

export function* loadPhotos() {
   var tripID = sessionStorage.getItem('tripID')
   var tripPhotoUrl = url +'trip/'+ tripID+ '/'  
   

   var photos = []
   yield fetch (tripPhotoUrl)
     .then((resp) => resp.json())
     .then(function(data){
       console.log('photos for trip')
       photos= data
     })
   
     yield put({ type : 'STORE_PHOTO', photos })
}

export function* watchStorePhotoRequest(){
  console.log("6")
    while(true){
         yield take(actions.STORE_PHOTO_REQUEST)
         yield call(loadPhotos)
    }
}
  

export function* watchStoreTripID(){
  console.log("7")
    while (true){
        const action = yield take(STORE_TRIP_ID)
        yield call(loadPhotos)
    }
}

export default function* () {
    console.log("8")
    yield fork(watchStoreTripID)
    yield fork(watchStorePhotoRequest)
}

