import { take, put, call, fork, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import api from 'services/api'
import * as actions from './actions'
import { STORE_TRIP_ID } from '../user/actions'

const url = 'http://'+location.host+'/api/trips/'
const userUrl = 'http://'+location.host+'/api/users/'


export function* loadUsers() {
    console.log('loadUsers')
    var tripID = sessionStorage.getItem('tripID')
    console.log('in loadUsers', tripID)

    var myname = sessionStorage.getItem('username')
    var tripTitle = sessionStorage.getItem('triptitle') 
    
    var ourTrip

    try {
        yield fetch(url)
            .then((resp) => resp.json())
            .then(function(data) {
                console.log('trip list')
                ourTrip = data.find(t => t.id == tripID)
            })
    } catch (e) {
        console.log('Get Trip list failed')
    }

    console.log('ourTrip', ourTrip)
    var tripInfo = [{ key: 0, field: 'title', data: ourTrip.title }, { key: 1, field: 'sinceWhen', data: ourTrip.sinceWhen }, { key: 2, field: 'tilWhen', data: ourTrip.tilWhen }, { key: 3, field: 'users', data: myname }]
    var creator = ourTrip.creator
    sessionStorage.setItem('tripInfo', JSON.stringify(tripInfo))

    var userlist = ourTrip.users
    sessionStorage.setItem('users', JSON.stringify(userlist))
    if (creator===myname) sessionStorage.setItem("owns","true")
    console.log(userlist)
    var userObjects = []
    for (var i=0; i<userlist.length; i++) {
        var u = userlist[i]
        userObjects.push({ id : u.id, name: u.username })
    }
    
    console.log(userObjects)
    var members = userObjects.map(u => u.name)
    var friends = []
    var msg
    var membernames

    // make list of trip members except me
    for (var i=0; i<members.length; i++)
        if (myname !== members[i])
            friends.push(members[i])

        console.log(friends)
        console.log('friends')

    if (friends.length === 0)
        msg = 'Invite other users'
    else {
        membernames = friends.join()
        msg = tripTitle + ' with ' + membernames
    }
    console.log('you are here')
    console.log(msg)

    var err = false

    var users = JSON.stringify(userObjects)
    yield put({ type : 'STORE_USERS', users, msg, err });
    console.log('load User end')
}

export function* addUser(username) {
    console.log('post in addUser')
    console.log(username)
    var token = sessionStorage.getItem('token') 
    var userObjects = JSON.parse(sessionStorage.getItem('users'))
    console.log(userObjects)
    var tripID = sessionStorage.getItem('tripID')
    var myname = sessionStorage.getItem('username')
    var tripTitle = sessionStorage.getItem('triptitle') 
    console.log(myname)
    console.log(userObjects)
    console.log(tripID)
    var userID, invitee
    var ids = []
    var names = []
    var friends = []
    var members
    if (userObjects != undefined) {
        ids = userObjects.map(u => u.id)
        names = userObjects.map(u => u.name)
    }

    var member = userObjects.find(u => u.name === username)
    var users = JSON.stringify(userObjects)
    var msg, err
    if (member != undefined) { // user is already in trip
        console.log('already exists')
        msg = username + ' already exists'
        err = true
        yield put({ type : 'STORE_USERS', users, msg, err });
    }
    else {
        // change username to userID
        yield fetch(userUrl)
            .then((resp) => resp.json())
            .then(function(data) {
                console.log(data)
                invitee = data.find(u => u.username === username)
                console.log('error here?')
                console.log(invitee)
                if (invitee != undefined) // username is valid
                    userID = invitee.id
        })

        if (userID != undefined) { // if username is valid (userID exists)
            console.log(ids)
            ids.push(userID)
            names.push(username)
            console.log(names)
            console.log(ids)
            console.log(userID)
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

            console.log(friends)
            console.log('friends')

            if (friends.length == 0)
                msg = 'Invite other users'
            else {
                members = friends.join()
                msg = tripTitle + ' with ' + members
            }
            console.log('you are here')
            console.log(msg)

            err = false
            yield put({ type : 'STORE_USERS', users, msg, err });

        }
        else { // invalid username input
            msg = 'Invalid username'
            err = true
            yield put({ type : 'STORE_USERS', users,  msg, err });
        }
    }
}

export function* watchAddUserRequest() {
    while (true) {
        console.log('adduser watch')
        const action = yield take(actions.ADDUSER_REQUEST)
        console.log(action)
        yield call(addUser, action.username)
        console.log('adduser watch end')
    }
}

export function* patchTrip(key, value) {
    //patch and return success or fail to state(state.expense.updated is true when success)
    var token = sessionStorage.getItem('token')
    var tripID = sessionStorage.getItem('tripID')
    var tripInfo = JSON.parse(sessionStorage.getItem('tripInfo'))
    var sinceWhen = tripInfo[1].data
    var tilWhen = tripInfo[2].data
    console.log('check date', sinceWhen, tilWhen)
    var tripUrl = url + tripID + '/'
    //var tripExpenses = JSON.parse(sessionStorage.getItem('tripExpenses'))
    var data
    console.log('in patchTrip saga', key, value)
    var patchData = {}
    var valid = true
    patchData[key] = value
    if (key == 'sinceWhen' && tilWhen <= value)
        valid = false
    if (key == 'tilWhen' && sinceWhen >= value)
        valid = false
    console.log(patchData, valid)
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
        console.log('patch trip success')
        //yield put(actions.patchexpenseSuc())
    } catch (e) {
        console.log('patch trip failed')
        //yield put(actions.patchexpenseFail())
    }
    yield call(loadUsers)
}

export function* watchTripPatchRequest() {
    while (true) {
        console.log('tripPatch watch')
        const action = yield take(actions.TRIP_PATCH_REQUEST)
        console.log('action: ', action)
        yield call(patchTrip, action.key, action.value)
    }
}

export function* watchStoreTripId() {
    while (true) {
        const action = yield take(STORE_TRIP_ID)
        console.log('tripID', action.tripID)
        yield call(loadUsers)
    }
}

export default function* () {
    yield fork(watchStoreTripId)
    yield fork(watchAddUserRequest)
    yield fork(watchTripPatchRequest)
}
