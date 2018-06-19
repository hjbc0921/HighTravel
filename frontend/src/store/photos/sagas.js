import { take, put, call, fork, select } from 'redux-saga/effects'
import api from 'services/api'
import * as actions from './actions'
import {STORE_TRIP_ID} from '../user/actions'
import {loadFolders} from '../addphoto/sagas'
const url = 'http://' + location.host +'/api/photos/'
const folderUrl = 'http://' + location.host +'/api/folders/'
const delay = (ms) => new Promise(res => setTimeout(res, ms))

export function* loadPhotos() {
    var tripID = sessionStorage.getItem('tripID')
    var tripPhotoUrl = folderUrl +'trip/'+ tripID+ '/'  

    var photos = []
    yield delay(300)
    yield fetch (tripPhotoUrl)
    .then((resp) => resp.json())
    .then(function(data){
    photos= data
    })
    yield put({ type : 'STORE_PHOTO', photos })
    
}

export function* watchStorePhotoRequest(){
    while(true){
         yield take(actions.STORE_PHOTO_REQUEST)
         yield call(loadPhotos)
    }
}

export function* deleteEach(photoID) {
   var token = sessionStorage.getItem('token')
   var photoUrl
   var photoID
   var data
   photoUrl = url + photoID + '/'
   try {
       if(photoID != undefined){
       data = yield call(fetch, photoUrl, {
              method: 'DELETE',
              headers: {
                 'Authorization': `token ${token}`,
                 'Content-Type': 'application/json'
                  }
              })
       }
   } catch (e) {
          console.log(e)
          console.log('delete photo failed')
   }
}
     
    
export function* deletePhoto(photoIDs){
   var tripID = sessionStorage.getItem('tripID')
   try{
      yield photoIDs.map((photoID) => call(deleteEach,photoID))
   }catch(e){
      console.log('delete photo failed')
   }
   yield call(loadPhotos)
}

export function* deleteFolder(id){
    var tripID = sessionStorage.getItem('tripID')
    var token = sessionStorage.getItem('token')
    let data
    let photoUrl = folderUrl + id + '/'
    try {
        if(id != undefined){
        data = yield call(fetch, photoUrl, {
               method: 'DELETE',
               headers: {
                  'Authorization': `token ${token}`,
                  'Content-Type': 'application/json'
                   }
               })
        }
    } catch (e) {
           console.log(e)
           console.log('delete folder failed')
    }
    yield call(loadPhotos)
    yield call(loadFolders)
 }

export function* watchDeletePhotoRequest(){
   while(true){
      const {photoIDs} = yield take(actions.DELETE_PHOTO_REQUEST)
      yield call(deletePhoto, photoIDs)
  }
}

export function* watchDeleteFolderRequest(){
    while(true){
       const {id} = yield take(actions.DELETE_FOLDER_REQUEST)
       yield call(deleteFolder, id)
   }
}

export default function* () {
    yield fork(watchStorePhotoRequest)
    yield fork(watchDeletePhotoRequest)
    yield fork(watchDeleteFolderRequest)
}

