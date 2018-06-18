import { take, put, call, fork } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import api from 'services/api'
import * as actions from './actions'

const url = 'http://'+location.host+'/api/trips/'
const userUrl = 'http://'+location.host+'/api/users/'

export function* loadUsers() {
    var tripID = sessionStorage.getItem('tripID')
    var myname = sessionStorage.getItem('username')
    var userOfTripUrl = userUrl + 'trip/' + tripID + '/'
    var userlist
    try {
        yield fetch(userOfTripUrl)
            .then((resp) => resp.json())
            .then(function(data) {
                userlist = data
            })
    } catch (e) {
        console.log('Get User of Trip failed')
    }
    sessionStorage.setItem('users', JSON.stringify(userlist))
    yield put({ type : 'STORE_TRIP_INFO' })
}

export function* loadTripInfo() {
    var tripID = sessionStorage.getItem('tripID')
    var myname = sessionStorage.getItem('username')
    var ourTrip
    var tripUrl = url + tripID + '/'

    try {
        yield fetch(tripUrl)
            .then((resp) => resp.json())
            .then(function(data) {
                ourTrip = data
            })
    } catch (e) {
        console.log('Get Trip list failed')
    }

    var tripTitle = ourTrip.title
    sessionStorage.setItem('triptitle', tripTitle)
    var tripInfo = [{ key: 0, field: 'title', data: ourTrip.title }, { key: 1, field: 'sinceWhen', data: ourTrip.sinceWhen }, { key: 2, field: 'tilWhen', data: ourTrip.tilWhen }, { key: 3, field: 'users', data: myname }]
    var creator = ourTrip.creator
    if (creator===myname) sessionStorage.setItem("owns","true")
    sessionStorage.setItem('tripInfo', JSON.stringify(tripInfo))

    yield put({ type : 'STORE_TRIP_INFO' })
}

export function* addUser(username) {
    var token = sessionStorage.getItem('token') 
    var userObjects = JSON.parse(sessionStorage.getItem('users'))
    var tripID = sessionStorage.getItem('tripID')
    var myname = sessionStorage.getItem('username')
    var tripTitle = sessionStorage.getItem('triptitle') 
    var userID, invitee
    var ids = []
    var names = []
    var friends = []
    var members
    if (userObjects != undefined) {
        ids = userObjects.map(u => u.id)
        names = userObjects.map(u => u.username)
    }

    var member = userObjects.find(u => u.username === username)
    var msg, err
    if (member != undefined) { // user is already in trip
        msg = username + ' already exists'
        err = true
        yield put({ type : 'STORE_USERS', msg, err });
    }
    else {
        // change username to userID
        yield fetch(userUrl)
            .then((resp) => resp.json())
            .then(function(data) {
                invitee = data.find(u => u.username === username)
                if (invitee != undefined) // username is valid
                    userID = invitee.id
        })

        if (userID != undefined) { // if username is valid (userID exists)
            ids.push(userID)
            names.push(username)
            var tripUrl = url + tripID + '/'
            var data
            try {
                if (userID != undefined) {
                    data = yield call(fetch, tripUrl, {
                        method: 'PATCH',
                        body: JSON.stringify({ users: ids }),
                        headers: {
                            'Authorization': `token ${token}`,
                            'Content-Type': 'application/json'
                        }
                    })
                }
            } catch(e) {
                console.log('add user failed')
            }

            // make list of trip members except me
            for (var i=0; i<names.length; i++)
                if (myname !== names[i])
                    friends.push(names[i])


            if (friends.length == 0)
                msg = 'Invite other users'
            else {
                members = friends.join()
                msg = tripTitle + ' with ' + members
            }

            err = false
            yield put({ type : 'STORE_USERS', msg, err });

        }
        else { // invalid username input
            msg = 'Invalid username'
            err = true
            yield put({ type : 'STORE_USERS', msg, err });
        }
        yield call(loadUsers)
    }
}

export function* watchAddUserRequest() {
    while (true) {
        const action = yield take(actions.ADDUSER_REQUEST)
        yield call(addUser, action.username)
    }
}

export function* deleteUser(ids) {
    var token = sessionStorage.getItem('token')
    var tripID = sessionStorage.getItem('tripID')
    var tripUrl = url + tripID + '/'
    var users = JSON.parse(sessionStorage.getItem('users'))
    var remainUsers = users.filter(u => ids.includes(u.id))
    var data
    try {
        if (ids != undefined) {
            data = yield call(fetch, tripUrl, {
                method: 'PATCH',
                body: JSON.stringify({users: ids}),
                headers: {
                    'Authorization': `token ${token}`,
                    'Content-Type': 'application/json'
                }
            })
        }
        sessionStorage.setItem('users', JSON.stringify(remainUsers))
        //yield put(actions.patchexpenseSuc())
    } catch (e) {
        console.log('delete user failed')
        //yield put(actions.patchexpenseFail())
    }
}

export function* watchDeleteUserRequest() {
    while (true) {
        const { ids } = yield take(actions.DELETE_USER_REQUEST)
        yield call(deleteUser, ids)
    }
}

export function* patchTrip(key, value) {
    var token = sessionStorage.getItem('token')
    var tripID = sessionStorage.getItem('tripID')
    var tripInfo = JSON.parse(sessionStorage.getItem('tripInfo'))
    var sinceWhen = tripInfo[1].data
    var tilWhen = tripInfo[2].data
    var tripUrl = url + tripID + '/'
    var data
    var patchData = {}
    var valid = true
    patchData[key] = value
    if (key == 'sinceWhen' && tilWhen <= value)
        valid = false
    if (key == 'tilWhen' && sinceWhen >= value)
        valid = false
    try {
        if (key != undefined && value != undefined && valid) {
            data = yield call(fetch, tripUrl, {
                method: 'PATCH',
                body: JSON.stringify(patchData),
                headers: {
                    'Authorization': `token ${token}`,
                    'Content-Type': 'application/json'
                }
            })
        }
        //yield put(actions.patchexpenseSuc())
    } catch (e) {
        console.log('patch trip failed')
        //yield put(actions.patchexpenseFail())
    }
    yield call(loadTripInfo)
}

export function* watchTripPatchRequest() {
    while (true) {
        const action = yield take(actions.TRIP_PATCH_REQUEST)
        yield call(patchTrip, action.key, action.value)
    }
}

export default function* () {
    yield fork(watchAddUserRequest)
    yield fork(watchTripPatchRequest)
    yield fork(watchDeleteUserRequest)
}
