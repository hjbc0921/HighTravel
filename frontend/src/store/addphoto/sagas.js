import { take, call, fork, select, put} from 'redux-saga/effects'
import api from 'services/api'
import * as actions from './actions'
import { STORE_TRIP_ID } from '../user/actions'
const url = 'http://'+location.host+'/api/folders/'
import axios from 'axios'
var token = sessionStorage.getItem('token')
var tripID = sessionStorage.getItem('tripID')

export function* loadFolders() {
    console.log('loadFolders')
    var tripFolderrl = url + 'trip/' + tripID + '/'
    console.log(tripFolderUrl)
    
    var folders
    yield fetch(tripFolderUrl)
        .then((resp) => resp.json())
        .then(function(data) {
            folders = data
        })

    yield put({ type : 'STORE_FOLDER', folders });
    sessionStorage.setItem('tripFolders', JSON.stringify(folders))

}
export function* postFolder(folder) {
    var myfolders = JSON.parse(sessionStorage.getItem('tripFolders'))
    var newFolder = { name: folder, photos_in_folder: [], tripID: tripID }
    let data
    if (folder != undefined) {
        data = yield call(fetch, url, {
            method: 'POST',
            body: JSON.stringify(newFolder),
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json;'
            }
        })
    }
    if (!data.ok){
        yield put(actions.addfolderFail("this Folder already exists"))
    }
    else{
        myfolders.push(newFolder)
        yield put(actions.storeFolder(myfolders))
        yield put(actions.addfolderSuc("new Folder created!"))
        sessionStorage.setItem('tripFolders', JSON.stringify(myfolders))
    }
}

export function* postPhoto(folder,selectedFiles){
   
    var files = selectedFiles
    for (var i=0;i<files.length;i++){
        const formData = new FormData()
        console.log(files[i])
        formData.append('file', files[i])
        formData.append('folder',folder)
        formData.append('tripID',tripID)
        console.log("#####SAGA####",formData.get('file').name,formData.get('folder'))
        axios.post('http://localhost:8000/api/photos/',formData,{
            headers : {
                "Authorization" : "token "+token,
            }
        })
    
    }
}

export function* watchPostFolderRequest() {
    while (true) {
        const { name, date } = yield take(actions.ADDFOLDER_REQUEST)
        var parsedDate = date.split('-').join('')
        var folder = parsedDate + '_' + name
        yield call(postFolder, folder)
    }
}

export function* watchStoreTripId() {
    while (true) {
        const action = yield take(STORE_TRIP_ID)
        yield call(loadFolders)
    }
}

export function* watchPostPhotoRequest(){
    while (true) {
        const {folder,selectedFiles} = yield take(actions.ADDPHOTO_REQUEST)
        yield call(postPhoto,folder,selectedFiles)
    }
}
export default function* () {
    yield fork(watchStoreTripId)
    yield fork(watchPostFolderRequest)
    yield fork(watchPostPhotoRequest)
}
