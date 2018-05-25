import { tale, call, fork, select, put} from 'redux-saga/effects'
import api from 'services/api'
import * as actions from './actions'
const url = 'http://'+location.host+'/api/trips/'

export function* postPhoto(selectedFile,text){

    var token = sessionStorage.getItem('token')
    var myphotos = JSON.parse(sessionStorage.getItem('myphoto'))
    let data;
    if (selectedFile !=undefined && text != undefined)
     {
         data = yield call(fetch, url, {
             method:'POST',
             body: JSON.stringify({ selectedFile:selectedFile, text:text}),
             headers: {
                  'Authorization': `token ${token}`,
                  'Content-Type': 'application/json;'
             }
         })
     }
     if (!data.ok){
        yield put(actions.addphotoFail("Check the input"))
     }
     else{
         let body = yield call([data, data.json])
         var photoJson = {selectedFile:body.selectedFile, text:body.text}
         myphotos.push(photoJson)
         yield put({ type: 'STORE_PHOTO', myphotos});
     }
}

export function* watchPostPhotoRequest(){
    while(true){
        const { selectedFile, text } = yield take(actions.ADDPHOTO_REQUEST)
        yield call(postPhoto, selectedFile, text)
    }
}
export default function* () {
    yield fork(watchPostPhotoRequest)
}
