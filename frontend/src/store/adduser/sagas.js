import { take, put, call, fork, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import api from 'services/api'
import * as actions from './actions'
import { STORE_TRIP_ID } from '../user/actions'

const url = 'http://127.0.0.1:8000/api/trips/'
const userUrl = 'http://127.0.0.1:8000/api/users/'


export function* loadUsers(tripID) {
    console.log('loadUsers')
    console.log(tripID)
    const state = yield select()
    var myname = state.intro.username
    var tripTitle = state.user.tripTitle
    
    var ourTrip

    try {
        yield fetch(url)
            .then((resp) => resp.json())
            .then(function(data) {
                console.log('trip list')
                ourTrip = data.find(t => t.id === tripID)
            })
     } catch (e) {
        console.log('Get Trip list failed')
    }

    console.log(ourTrip)
    var userlist = ourTrip.users
    console.log(userlist)
    var users = []
    for (var i=0; i<userlist.length; i++) {
        var u = userlist[i]
        users.push({ id : u.id, name: u.username })
    }
    
    console.log(users)
    var members = users.map(u => u.name)
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

    yield put({ type : 'STORE_USERS', users, msg, err });
}

export function* addUser(username) {
    console.log('post in addUser')
    console.log(username)
    const state = yield select()
    console.log(state)
    var token = state.intro.token
    var users = state.adduser.users
    var tripID = state.user.tripID
    var myname = state.intro.username
    console.log(myname)
    console.log(users)
    console.log(tripID)
    var userID, invitee
    var ids = []
    var names = []
    var friends = []
    if (users != undefined) {
        ids = users.map(u => u.id)
        names = users.map(u => u.username)
    }

    var member = users.find(u => u.name === username)
    var msg, err
    console.log(member)
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
                            'Content-Type': 'application/json;'
                        }
                    })
                }
                console.log('before loadRules')
                yield call(loadUsers, tripID)
                names.push(username)

                // make list of trip members except me
                for (var i=0; i<names.length; i++)
                    if (myname !== names[i])
                        friends.push(names[i])

                console.log(friends)
                console.log('friends')

                if (friends.length === 0)
                    msg = 'Invite other users'
                else {
                    members = friends.join()
                    msg = tripTitle + ' with ' + members
                }
                console.log('you are here')
                console.log(msg)

                err = false
                yield put({ type : 'STORE_USERS', users, msg, err });

            } catch(e) {
                console.log('add user failed')
            }
        }
        else { // invalid username input
            msg = 'Invalid username'
            err = true
            yield put({ type : 'STORE_USERS',users,  msg, err });
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

export default function* () {
    // wait until trip ID is given from User page (TripTitle button is clicked)
    const { tripID } = yield take(STORE_TRIP_ID) 
    yield call(loadUsers, tripID)
    console.log(tripID)
    console.log('watchAddUserRequest')
    yield fork(watchAddUserRequest)
}
