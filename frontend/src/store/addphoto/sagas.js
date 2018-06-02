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
            console.log('folders for trip')
            folders = data
            console.log(folders)
        })

    console.log('tripFolders',folders)

    yield put({ type : 'STORE_FOLDER', folders });

}
export function* postFolder(folder) {
    //var myfolders = JSON.parse(sessionStorage.getItem('myfolders'))
    let data
    console.log('$$$44', token, tripID)
    if (folder != undefined) {
        data = yield call(fetch, url, {
            method: 'POST',
            body: JSON.stringify({ name: folder, tripID: tripID, photos_in_folder: [] }),
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json;'
            }
        })
    }
    if (!data.ok){
        yield put(actions.addtripFail("Check the date"))
    }
    else{
        // let body = yield call([data, data.json])
        //myfolders.push(folder)
        //yield put({ type : 'STORE_FOLDER', myfolders });
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
        console.log('in watch Post Folder Request')
        const { name, date } = yield take(actions.ADDFOLDER_REQUEST)
        console.log('date : ' , date, 'name :' , name)
        var parsedDate = date.split('-').join('')
        console.log("check here", parsedDate)
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
    //yield fork(watchStoreTripId)
    console.log('in fork')
    yield fork(watchPostFolderRequest)
    yield fork(watchPostPhotoRequest)
}
