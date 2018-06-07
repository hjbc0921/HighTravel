import { take, put, call, fork } from 'redux-saga/effects'
import api from 'services/api'
import * as actions from './actions'

const url = 'http://'+location.host+'/api/photos/'
const diaryUrl = 'http://'+location.host+'/api/diaries/'

export function* loadPhotos(date) {
    var tripID = sessionStorage.getItem('tripID')
    var day = date.split('-').join('')
    var datePhotoUrl = url + 'trip/' + tripID + '/' + 'date/' + day + '/'
    
    var photos
    yield fetch(datePhotoUrl)
        .then((resp) => resp.json())
        .then(function(data) {
            photos = data
        })

    console.log('tripPhotos',photos)
    sessionStorage.setItem('photoOfDate', JSON.stringify(photos))
    yield put({ type : 'STORE_DATE_PHOTO', photos })

}

export function* postDiary(date, contents, photos) {

    var token = sessionStorage.getItem('token')
    var tripID = sessionStorage.getItem('tripID')
    var userID = sessionStorage.getItem('userID')
    let data

    try {
        if (date != undefined && contents != undefined) {
            data = yield call(fetch, diaryUrl, {
                method: 'POST',
                body: JSON.stringify({ contents: contents, writer: userID, date: date, tripID: tripID, photos: photos }),
                headers: {
                    'Authorization': `token ${token}`,
                    'Content-Type': 'application/json'
                }
            })
        }
    } catch (e) {
        console.log('post diary failed')
    }
    
    // load Diary list again or put newly created diary here

}

export function* watchPostDiaryRequest() {
    while (true) {
        const { date, contents, photos } = yield take(actions.POST_DIARY_REQUEST)
        console.log('watch Post Diary', date, contents, photos)
        yield call(postDiary, date, contents, photos)
    }
}

export function* watchPickDate() {
    while (true) {
        const { date } = yield take(actions.PICK_DATE)
        yield call(loadPhotos, date)
    }
}

export default function* () {
    yield fork(watchPickDate)
    yield fork(watchPostDiaryRequest)
}
