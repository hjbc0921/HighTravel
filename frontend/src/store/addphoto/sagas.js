import { take, call, fork, select, put} from 'redux-saga/effects'
import api from 'services/api'
import * as actions from './actions'
import { STORE_TRIP_ID } from '../user/actions'
const url = 'http://'+location.host+'/api/folders/'

export function* loadFolders() {
    var tripID = sessionStorage.getItem('tripID')
    var tripFolderUrl = url + 'trip/' + tripID + '/'
    
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
    var token = sessionStorage.getItem('token')
    var myfolders = JSON.parse(sessionStorage.getItem('tripFolders'))
    var tripID = JSON.parse(sessionStorage.getItem('tripID'))
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

export default function* () {
    yield fork(watchStoreTripId)
    yield fork(watchPostFolderRequest)
}
