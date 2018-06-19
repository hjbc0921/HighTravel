import { take, call, fork, select, put} from 'redux-saga/effects'
import api from 'services/api'
import * as actions from './actions'
import { STORE_TRIP_ID } from '../user/actions'
import {loadPhotos} from '../photos/sagas'
const url = 'http://'+location.host+'/api/folders/'
import axios from 'axios'
const url2 = 'http://'+location.host+'/api/photos/'

export function* loadFolders() {
    var token = sessionStorage.getItem('token')
    var tripID = sessionStorage.getItem('tripID')
    var tripFolderUrl = url + 'trip/' + tripID + '/'
    var folders = []
    yield fetch(tripFolderUrl)
        .then((resp) => resp.json())
        .then(function(data) {
            folders = data
        })
    var sorted = folders.sort(function(a,b) {return (a.name < b.name) ? -1 : ((b.name < a.name) ? 1 : 0);} )
    yield put({ type : 'STORE_FOLDER', sorted });
    sessionStorage.setItem('tripFolders', JSON.stringify(folders))

}
export function* postFolder(folder) {
    var token = sessionStorage.getItem('token')
    var tripID = sessionStorage.getItem('tripID')
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
        let body = yield call([data, data.json])
        let tripJson = {id:body.id, name:body.name}
        myfolders.push(tripJson)
        sessionStorage.setItem('tripFolders', JSON.stringify(myfolders))
        yield put(actions.storeFolder(myfolders))
        yield put(actions.addfolderSuc("new Folder created!"))
        
    }
}

export function* postPhoto(folder, fileList){
    let token = sessionStorage.getItem('token')
    let tripID = sessionStorage.getItem('tripID')
    
    let folders = JSON.parse(sessionStorage.getItem('tripFolders'))
    let folderID = folders.find(f => f.name === folder)
    fileList = fileList.map(f => f.originFileObj);
    let result = 0

    for (let i = 0; i < fileList.length; i++){
        const formData = new FormData()
        formData.append('file', fileList[i])
        formData.append('folder', folderID.id)
        formData.append('tripID', tripID)
        axios.post('http://localhost:8000/api/photos/',formData,{
            headers : {
                "Authorization" : "token "+token,
            }
        })
    
    }
   yield call(loadPhotos)
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
        const {folder,fileList} = yield take(actions.ADDPHOTO_REQUEST)
        yield call(postPhoto,folder,fileList)
    }
}
export default function* () {
    yield fork(watchStoreTripId)
    yield fork(watchPostFolderRequest)
    yield fork(watchPostPhotoRequest)
}
